import React, { useState, useEffect, useCallback} from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'; 
import ClientCard from "../components/ClientCard";
import HeaderClientConfig from "../components/Header/HeaderClient&Config";

import { auth, db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


export default function ClientScreen({navigation}) {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchClients = async () => {
        setLoading(true);
        try {
          const user = auth.currentUser;
          if (!user) return;
          const clientsCol = collection(db, "users", user.uid, "clients");
          const clientsSnap = await getDocs(clientsCol);

          const clientsData = await Promise.all(
            clientsSnap.docs.map(async docSnap => {
              const data = docSnap.data();
              const clientId = docSnap.id;
              const measuresCol = collection(db, "users", user.uid, "clients", clientId, "measurements");
              const measuresSnap = await getDocs(measuresCol);
              const measurements = measuresSnap.docs.map(m => ({ id: m.id, ...m.data() }));
              return {
                id: clientId,
                nome: data.name,
                email: data.email,
                telefone: data.phone,
                imagemUrl: data.photoURL,
                measurements
              };
            })
          );

          if (isActive) setClients(clientsData);
        } catch (err) {
          console.error("Erro ao buscar clientes:", err);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchClients();

      // cleanup caso a tela seja deixada antes de terminar a busca
      return () => { isActive = false; };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.containerCentered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //ALTERAR DEPOIS
  const applyPhoneMask = (value) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (2 para DDD + 9 para número)
    const limitedNumbers = numbers.slice(0, 11);
    
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
      return `(${limitedNumbers.slice(0, 2)})${limitedNumbers.slice(2)}`;
    } else if (limitedNumbers.length <= 10) {
      // Formato (DD)nnnn-nnnn para números com 8 dígitos
      return `(${limitedNumbers.slice(0, 2)})${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
    } else {
      // Formato (DD)nnnnn-nnnn para números com 9 dígitos
      return `(${limitedNumbers.slice(0, 2)})${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
    }
  };


    return (
        <View style={styles.container}>
            <FlatList style={styles.lista}
                data={clients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ClientCard
                    nome={item.nome}
                    telefone={applyPhoneMask(item.telefone)}
                    imagemURL={item.imagemUrl}
                    onPress={() => navigation.navigate('Medidas_Clientes', { client: item })}
                    />
                )}
                showsVerticalScrollIndicator={true}
                ListHeaderComponent={
                  <View style={styles.header}>
                    <HeaderClientConfig title="Clientes"/>
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastro_Editar_Clientes', { headerTitle: 'Criar Cliente'})}>
                      <Feather name="plus" size={28} color="#323232" />
                    </TouchableOpacity>
                  </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  containerCentered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  header: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 50
  },
  lista: {
    width:'95%',
    alignSelf:'center',
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 15,
    fontFamily: 'Inter_400Regular'
  }
});

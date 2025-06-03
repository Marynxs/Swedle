import React, { useState, useCallback} from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'; 

// Componentes
import ClientCard from "../components/ClientCard";
import HeaderClientConfig from "../components/Header/HeaderClient&Config";

// Firebase
import { auth, db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useTheme } from "../context/hooks/useTheme";

// Loading Screen
import LoadingScreen from "../components/LoadingScreen";

// Máscara de telefone
import {applyPhoneMask} from '../utils/Validator'

// Tela que lista todos os clientes cadastrados do usuário atual
export default function ClientScreen({navigation}) {
  const {colors} = useTheme()

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

  // useFocusEffect garante que os dados sejam recarregados toda vez que a tela for aberta
  useFocusEffect(
    useCallback(() => {
      let isActive = true; // usado para evitar problemas se a tela for desmontada durante a requisição

      // Função assíncrona para buscar clientes e suas medidas no Firestore
      const fetchClients = async () => {
        setLoading(true);
        try {
          const user = auth.currentUser;
          if (!user) return;
          const clientsCol = collection(db, "users", user.uid, "clients");
          const clientsSnap = await getDocs(clientsCol);

          // Acessa a coleção de clientes do usuário atual
          const clientsData = await Promise.all(
            clientsSnap.docs.map(async docSnap => {
              const data = docSnap.data();
              const clientId = docSnap.id;

              // Busca as medidas desse cliente
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

          // Se ainda estiver na tela, atualiza os dados
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

      // Mostra a tela de loading enquanto carrega os dados
    if (loading) {
      return <LoadingScreen loading={loading} />;
    }

    // Interface principal da tela de clientes
    return (
        <View style={[styles.container , { backgroundColor: colors.background }]}>
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
                contentContainerStyle={{ flexGrow: 1 }}
                ListHeaderComponent={
                  <View style={styles.header}>
                    <HeaderClientConfig title="Clientes"/>
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastro_Editar_Clientes', { headerTitle: 'Criar Cliente'})}>
                      <Feather name="plus" size={28} color={colors.foreground} />
                    </TouchableOpacity>
                  </View>
                }
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: colors.foreground }]}>
                      Ainda não há clientes cadastrados.{'\n'} Toque no “+” para adicionar o primeiro.
                    </Text>
                  </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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
  },
    emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    alignSelf:'center',
    lineHeight: 24,
  },
});

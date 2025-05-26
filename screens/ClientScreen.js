import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import ClientCard from "../components/ClientCard";


export default function ClientScreen({navigation}) {
    const clientes = [
        {
            id: '1',
            nome: 'João Silva',
            telefone: '+55 11 9999-9999',
            imagem: require('../assets/avatar.png') 
        },
        {
            id: '2',
            nome: 'Maria Souza',
            telefone: '+55 11 9999-9999',
            imagem: require('../assets/avatar2.png')
        },
        {
            id: '3',
            nome: 'João Silva',
            telefone: '+55 11 9999-9999',
            imagem: require('../assets/avatar3.png') 
        },
        {
            id: '4',
            nome: 'Maria Souza',
            telefone: '+55 11 9999-9999',
            imagem: require('../assets/avatar4.png')
        },
        {
          id: '5',
          nome: 'João Silva',
          telefone: '+55 11 9999-9999',
          imagem: require('../assets/avatar.png') 
        },
        {
            id: '6',
            nome: 'Maria Souza',
            telefone: '+55 11 9999-9999',
            imagem: require('../assets/avatar2.png')
        },
        {
            id: '7',
            nome: 'João Silva',
            telefone: '+55 11 9999-9999',
            imagem: require('../assets/avatar3.png') 
        },
        {
            id: '8',
            nome: 'Maria Souza',
            telefone: '+55 11 9999-9999',
            imagem: require('../assets/avatar4.png')
        },
        {
          id: '9',
          nome: 'João Silva',
          telefone: '+55 11 9999-9999',
          imagem: require('../assets/avatar.png') 
        },
        {
            id: '10',
            nome: 'Maria Souza',
            telefone: '+55 11 9999-9999',
            imagem: require('../assets/avatar2.png')
        },
        {
            id: '11',
            nome: 'João Silva',
            telefone: '+55 11 9999-9999',
            imagem: require('../assets/avatar3.png') 
        },
        {
            id: '12',
            nome: 'Maria Souza',
            telefone: '+55 11 9999-9999',
            imagem: require('../assets/avatar4.png')
        },
      ];

    return (
        <View style={styles.container}>
            <FlatList style={styles.lista}
                data={clientes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ClientCard
                    nome={item.nome}
                    telefone={item.telefone}
                    imagem={item.imagem}
                    onPress={() => navigation.navigate('Medidas_Clientes', { cliente: item })}
                    />
                )}
                showsVerticalScrollIndicator={true}
                ListHeaderComponent={
                  <View style={styles.header}>
                    <Text style={styles.title}>Clientes</Text>
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
  title: {
    fontSize: 24,
    fontFamily: 'Inter_500Medium',
    color: '#323232'
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

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header/Header';
import Measurements from '../components/Measurements';

export default function ClientMeasuresScreen({ route, navigation }) {
  const { cliente } = route.params;
  
  const medidas = [
    { label: 'Busto', valor: '98' },
    { label: 'Torax', valor: '68' },
    { label: 'Cintura', valor: '92' },
    { label: 'Quadril', valor: '82' },
    { label: 'Pernas', valor: '92' },
    { label: 'Braços', valor: '28' },
    { label: 'Braços', valor: '28' },
    { label: 'Braços', valor: '28' },
    { label: 'Braços', valor: '28' },
    { label: 'Braços', valor: '28' },
    { label: 'Braços', valor: '28' },
  ];

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        headerTitle={cliente.nome}
        menuItems={[
          { label: 'Editar', iconName: 'pencil-outline', onPress: () => {/* editar */} },
          { label: 'Apagar', iconName: 'trash-outline', color: '#BE1515', onPress: () => {/* apagar */} },
        ]}
      />
       
      <Text style={styles.sectionTitle}>Medidas</Text>

      <Measurements medidas={medidas}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  nome: {
    position: 'absolute',
    left: 20,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#323232',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    marginBottom: 12,
    color: '#323232',
  },
  card: {
    backgroundColor: '#F0BC20',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imagemContainer: {
    backgroundColor: '#E7E7E7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    width: 90,
    height: 200,
    resizeMode: 'contain',
  },
  medidasContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 0.3,
    borderColor: '#323232',
    paddingBottom: 4,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    color: '#323232',
  },
  valor: {
    fontFamily: 'Inter_500Medium',
    color: '#323232',
  },
});

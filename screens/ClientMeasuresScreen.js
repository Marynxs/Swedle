import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header/Header';
import Measurements from '../components/Measurements';

import { auth, db, storage } from '../firebaseConfig';
import { collection, doc, getDocs, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

import { useTheme } from '../hooks/useTheme';
export default function ClientMeasuresScreen({ route, navigation }) {
  const {colors} = useTheme()
  const { client } = route.params;
  const [medidas, setMedidas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchMeasurements = async () => {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error('Usuário não autenticado');

          // 1) Recarrega o documento do client
          const clientRef = doc(
            db,
            'users',
            user.uid,
            'clients',
            client.id
          );
          const clientSnap = await getDoc(clientRef);
          if (!clientSnap.exists()) throw new Error('Cliente não encontrado');

          const clientData = clientSnap.data();

          // 2) Busca todas as medidas
          const measuresCol = collection(
            db,
            'users',
            user.uid,
            'clients',
            client.id,
            'measurements'
          );
          const measuresSnap = await getDocs(measuresCol);

          const arr = measuresSnap.docs.map(mDoc => ({
            label: mDoc.data().description,
            valor: mDoc.data().sizeCm
          }));

          if (isActive) {
            setMedidas(arr);
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Erro ao carregar medidas', error.message);
        }
      };

      fetchMeasurements();

      return () => {
        // para evitar setState após unmount
        isActive = false;
      };
    }, [client.id])
  );

    const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja apagar o client ${client.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Apagar', style: 'destructive', onPress: deleteClient }
      ]
    );
  };

  const deleteClient = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');

      // 1) Apaga todas as medidas
      const measuresCol = collection(
        db,
        'users',
        user.uid,
        'clients',
        client.id,
        'measurements'
      );
      const measuresSnap = await getDocs(measuresCol);
      for (const mDoc of measuresSnap.docs) {
        await deleteDoc(mDoc.ref);
      }

      // 2) Apaga a foto no Storage (se existir)
      if (client.imagemUrl) {
        const imageRef = ref(
          storage,
          `users/${user.uid}/clients/${client.id}/photo.jpg`
        );
        await deleteObject(imageRef);
      }

      // 3) Apaga o documento do client
      const clientRef = doc(
        db,
        'users',
        user.uid,
        'clients',
        client.id
      );
      await deleteDoc(clientRef);

      // 4) Feedback e volta
      Alert.alert('Sucesso', 'client apagado.');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao apagar client:', error);
      Alert.alert('Erro', error.message);
    }
  };


  return (
    <View style={[styles.container , { backgroundColor: colors.background }]}>
      <Header
        navigation={navigation}
        headerTitle={client.nome}
        menuItems={[
          { label: 'Editar', iconName: 'pencil-outline', onPress: () => navigation.navigate('Cadastro_Editar_Clientes', { headerTitle: 'Editar cliente', client: client}) },
          { label: 'Apagar', iconName: 'trash-outline', color: '#BE1515', onPress: handleDelete },
        ]}
      />
       
      <Text style={[styles.sectionTitle,{color: colors.foreground} ]}>Medidas</Text>

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

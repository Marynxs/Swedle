import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import Header from '../components/Header/Header';
import Measurements from '../components/Measurements';

//FireBase
import { auth, db, storage } from '../firebaseConfig';
import { collection, doc, getDocs, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

//Loading Screen
import LoadingScreen from '../components/LoadingScreen';

//Trocar tema
import { useTheme } from '../hooks/useTheme';

// Tela que mostra as medidas de um cliente específico
export default function ClientMeasuresScreen({ route, navigation }) {
  const {colors} = useTheme()

  // Cliente recebido por parâmetro de rota para saber de que cliente se trata 
  const { client } = route.params;

  // Estados para armazenar medidas, cliente atualizado e status de carregamento
  const [medidas, setMedidas] = useState([]);
  const [loading,setLoading] = useState(false)
  const [clientData, setClientData] = useState(client);

  // useFocusEffect garante que os dados sejam recarregados toda vez que a tela for aberta
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchMeasurements = async () => {
        try {
          setLoading(true)
          const user = auth.currentUser;
          if (!user) throw new Error('Usuário não autenticado');


          // Recarrega o documento do cliente
          const clientRef = doc(
            db,
            'users',
            user.uid,
            'clients',
            client.id
          );
          const clientSnap = await getDoc(clientRef);
          if (!clientSnap.exists()) throw new Error('Cliente não encontrado');

          setClientData( clientSnap.data());

          // Busca todas as medidas
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
        finally{
          setLoading(false)
        }
      };

      fetchMeasurements();

      return () => {
        isActive = false;
      };
    }, [client.id])
  );

  // Abre o alerta de confirmação de exclusão do cliente
  const handleDelete = () => {
    const message = `Deseja apagar o cliente ${clientData.name}?`;

    if (Platform.OS === 'web') {
      // Web: usa confirm
      const confirm = window.confirm(message);
      if (confirm) {
        deleteClient();
      }
    } else {
      // Mobile: usa Alert nativo
      Alert.alert(
        'Confirmar exclusão',
        message,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Apagar', style: 'destructive', onPress: deleteClient }
        ]
      );
    }
  };

  // Faz a parte de excluir o cliente
  const deleteClient = async () => {
    try {
      setLoading(true)
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');

      // Apaga todas as medidas
      const measuresCol = collection(
        db,
        'users',
        user.uid,
        'clients',
        client.id,
        'measurements'
      );
      const measuresSnap = await getDocs(measuresCol);
      for (const measureDoc of measuresSnap.docs) {
        await deleteDoc(measureDoc.ref);
      }

      // Apaga a foto no Storage (se existir)
      if (client.imagemUrl) {
        const imageRef = ref(
          storage,
          `users/${user.uid}/clients/${client.id}/photo.jpg`
        );
        await deleteObject(imageRef);
      }

      // Apaga o documento do cliente
      const clientRef = doc(
        db,
        'users',
        user.uid,
        'clients',
        client.id
      );
      await deleteDoc(clientRef);

      // Feedback e volta para a tela anterior (clientes)
      Alert.alert('Sucesso', 'Cliente apagado.');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao apagar client:', error);
      Alert.alert('Erro', error.message);
    }
    finally{
      setLoading(false)
    }
  };

  if (loading) {
    return <LoadingScreen loading={loading} />;
  }

  return (
    <View style={[styles.container , { backgroundColor: colors.background }]}>
      <Header
        navigation={navigation}
        headerTitle={clientData.name}
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

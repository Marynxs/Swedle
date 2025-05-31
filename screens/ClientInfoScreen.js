import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextField from '../components/TextField';
import MeasureTextField from '../components/ClientInfoScreen/MeasureTextField';
import AddMeasureButton from '../components/ClientInfoScreen/AddMeasureButton'
import ChoosePictureButton from '../components/ClientInfoScreen/ChoosePictureButton';
import Header from '../components/Header/Header'
import ErrorText from '../components/Login&RegisterScreen/ErrorText';

import * as ImagePicker from 'expo-image-picker';

import { db, auth, storage } from '../firebaseConfig';
import { doc, collection, writeBatch, getDocs, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

import { useTheme } from '../hooks/useTheme';

import LoadingScreen from '../components/LoadingScreen';



export default function ClientInfoScreen({ navigation, route }) {
  const { colors } = useTheme()
  const [loading, setLoading] = useState(false)

  const editingClient = route.params?.client;      // undefined se criação
  const clientId      = editingClient?.id;
  const headerTitle = route.params.headerTitle;

  const [measures, setMeasures] = useState([{ description: '', sizeCm: '' }]);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [photoUri, setPhotoUri] = useState(null);
  const [originalMeasureIds, setOriginalMeasureIds] = useState([]);

  // Estados para controle de erros de validação
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Função para aplicar máscara de telefone
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

  // Função para validar nome
  const validateName = (nameValue) => {
    if (!nameValue.trim()) {
      setNameError('Nome é obrigatório');
      return false;
    } else if (nameValue.trim().length < 2) {
      setNameError('Nome deve ter pelo menos 2 caracteres');
      return false;
    } else if (!/^[a-zA-ZàáâãäéêëíîïóôõöúûüçÀÁÂÃÄÉÊËÍÎÏÓÔÕÖÚÛÜÇ\s]+$/.test(nameValue)) {
      setNameError('Nome deve conter apenas letras e espaços');
      return false;
    } else {
      setNameError('');
      return true;
    }
  };

  // Função para validar email
  const validateEmail = (emailValue) => {
    if (!emailValue.trim()) {
      setEmailError('Email é obrigatório');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setEmailError('Email deve ter um formato válido');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  // Função para validar telefone
  const validatePhone = (phoneValue) => {
    // Remove caracteres não numéricos para validação
    const numbers = phoneValue.replace(/\D/g, '');
    
    if (!phoneValue.trim()) {
      setPhoneError('Telefone é obrigatório');
      return false;
    } else if (numbers.length < 10) {
      setPhoneError('Telefone deve ter pelo menos 10 dígitos');
      return false;
    } else if (numbers.length > 11) {
      setPhoneError('Telefone deve ter no máximo 11 dígitos');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  // Handler para mudança do nome
  const handleNameChange = (value) => {
    setName(value);
    validateName(value);
  };

  // Handler para mudança do email
  const handleEmailChange = (value) => {
    setEmail(value);
    validateEmail(value);
  };

  // Handler para mudança do telefone
  const handlePhoneChange = (value) => {
    const maskedPhone = applyPhoneMask(value);
    setPhone(maskedPhone);
    validatePhone(maskedPhone);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (!clientId) return;

      const fetchData = async () => {
        try {
          const user = auth.currentUser;
          if (!user) return;

          // 1) busca dados do cliente
          const docRef = doc(db, 'users', user.uid, 'clients', clientId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && isActive) {
            const data = docSnap.data();
            setName(data.name || '');
            setEmail(data.email || '');
            // Aplicar máscara ao telefone carregado
            setPhone(applyPhoneMask(data.phone || ''));
            setPhotoUri(data.photoURL || null);
          }

          // 2) busca medidas
          const measuresCol = collection(
            db,
            'users',
            user.uid,
            'clients',
            clientId,
            'measurements'
          );
          const measuresSnap = await getDocs(measuresCol);
          if (isActive) {
            const loaded = measuresSnap.docs.map(m => ({
              id: m.id,
              description: m.data().description,
              sizeCm: String(m.data().sizeCm),
            }));
            setMeasures(loaded);
            setOriginalMeasureIds(loaded.map(m => m.id));
          }
        } catch (err) {
          console.error('Erro ao carregar cliente:', err);
        }
      };

      fetchData();
      return () => {
        isActive = false;
      };
    }, [clientId])
  );

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Precisamos de permissão para acessar suas fotos.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      aspect: [4, 1],   
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const createAddMeasure = () => {
    setMeasures(prev => [...prev,{ description: '', sizeCm: '' }]);
  };

  const updateMeasure = (index, field, value) => {
    setMeasures(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const removeMeasure = index =>
    setMeasures(prev => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    setLoading(true)
    try{
      // Validar todos os campos antes de salvar
      const isNameValid = validateName(name);
      const isEmailValid = validateEmail(email);
      const isPhoneValid = validatePhone(phone);

      // Se algum campo for inválido, não prosseguir
      if (!isNameValid || !isEmailValid || !isPhoneValid) {
        return;
      }

      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado");

      const clientsCol= collection(db, 'users', user.uid, 'clients');
      const clientRef = editingClient ? doc(db, 'users', user.uid, 'clients', editingClient.id) : doc(clientsCol);
      const clientId = clientRef.id;

      let photoURL = editingClient?.imagemUrl || null;
      if (photoUri && photoUri !== editingClient?.imagemUrl) {
        // se for edição e já existia uma foto, apaga primeiro
        if (editingClient?.imagemUrl) {
          const oldRef = ref(
            storage,
            `users/${user.uid}/clients/${clientId}/photo.jpg`
          );
          await deleteObject(oldRef).catch(() => {});
        }
        // upload
        const response = await fetch(photoUri);
        const blob = await response.blob();
        const imageRef = ref(
          storage,
          `users/${user.uid}/clients/${clientId}/photo.jpg`
        );
        await uploadBytes(imageRef, blob, { contentType: 'image/jpeg' });
        photoURL = await getDownloadURL(imageRef);
      }

      const batch = writeBatch(db);

      // Salvar telefone sem máscara no banco de dados
      const phoneNumbers = phone.replace(/\D/g, '');

      batch.set(
        clientRef,
        { 
          name: name.trim(), 
          email: email.trim().toLowerCase(), 
          phone: phoneNumbers, 
          ...(photoURL && { photoURL }) 
        },
        { merge: true }
      );

      const measuresCol = collection(db, 'users', user.uid, 'clients', clientId, 'measurements');
      const currentIds = measures.map(m => m.id).filter(id => id);
      const idsToDelete = originalMeasureIds.filter(id => !currentIds.includes(id));

      // set/update das medidas existentes e criação das novas
      measures.forEach(m => {
        if (m.id) {
          const mRef = doc(measuresCol, m.id);
          batch.set(mRef, { description: m.description, sizeCm: Number(m.sizeCm) }, { merge: true });
        } else {
          const mRef = doc(measuresCol);
          batch.set(mRef, { description: m.description, sizeCm: Number(m.sizeCm) });
        }
      });

      // delete das medidas removidas
      idsToDelete.forEach(id => {
        const mRef = doc(measuresCol, id);
        batch.delete(mRef);
      });

      await batch.commit();
      Alert.alert('Sucesso', 'Cliente e medidas salvos!');
      navigation.goBack();
    }
    catch (error) {
      console.error('Código:', error.code);
      console.error('Mensagem:', error.message);
      console.error('Resposta do servidor:', error.customData?.serverResponse);
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
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        enableOnAndroid={true}
        extraScrollHeight={250}
      >
        <Header headerTitle={headerTitle} navigation={navigation} onSave={handleSave}/>

        <Text style={[styles.sectionTitle, {color: colors.foreground}]}>Informações do Cliente</Text>
        <View style={[styles.formContainer, {backgroundColor: colors.clientContainer}]}>

          <ChoosePictureButton onPress={pickImage} uri={photoUri}/>

          <View>
            <TextField 
              placeholder="Nome" 
              value={name} 
              onChangeText={handleNameChange}
            />
            <ErrorText error={nameError}/>
          </View>

          <View>
            <TextField 
              placeholder="Email" 
              value={email} 
              onChangeText={handleEmailChange} 
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <ErrorText error={emailError}/>
          </View>

          <View>
            <TextField 
              placeholder="Telefone" 
              value={phone} 
              onChangeText={handlePhoneChange} 
              keyboardType="phone-pad"
            />
            <ErrorText error={phoneError}/>
          </View>

          <Text style={[styles.sectionSubtitle, {color: colors.yellowTextDark}]}>Medidas do Cliente</Text>
          
          {measures.map((measurement, index) => (
            <MeasureTextField
              key={index}
              description={measurement.description}
              sizeCm={measurement.sizeCm}
              onChangeDescription={text => updateMeasure(index, 'description', text)}
              onChangeSizeCm={text => updateMeasure(index, 'sizeCm', text)}
              onDelete={() => removeMeasure(index)} 
            />
          ))}

          <AddMeasureButton onPress={createAddMeasure}/>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,          
    paddingRight: 12
  },

  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontFamily: 'Inter_500Medium',
  },
  formContainer: {
    borderRadius: 16,
    padding: 20,
    paddingBottom: 35
  },
  sectionSubtitle: {
    marginTop: 8,
    marginBottom: 8,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
    fontSize: 15
  },
  scroll: {
    flex: 1,   
  },
  scrollContainer: {
    flexGrow: 1,      
    paddingBottom: 60,
    paddingLeft: 24,
    paddingRight: 12,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: 'Inter_400Regular',
  }
});
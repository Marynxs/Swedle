import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Componentes personalizados
import TextField from '../components/TextField';
import MeasureTextField from '../components/ClientInfoScreen/MeasureTextField';
import AddMeasureButton from '../components/ClientInfoScreen/AddMeasureButton';
import ChoosePictureButton from '../components/ClientInfoScreen/ChoosePictureButton';
import Header from '../components/Header/Header';
import ErrorText from '../components/Login&RegisterScreen/ErrorText';

// Seleção de imagens
import * as ImagePicker from 'expo-image-picker';

// Firebase
import { db, auth, storage } from '../firebaseConfig';
import { doc, collection, writeBatch, getDocs, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Tema escuro/claro
import { useTheme } from '../context/hooks/useTheme';

// Tela de carregamento
import LoadingScreen from '../components/LoadingScreen';

// Validações de campos
import { validateName, validatePhoneOptional, validateEmailOptional, applyPhoneMask } from '../utils/Validator';

// Componente principal (Acontece muita coisa)
// Essa tela é tanto para criar quanto editar um cliente
export default function ClientInfoScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  // Dados do cliente (para edição)
  const editingClient = route.params?.client;
  const clientId = editingClient?.id;
  const headerTitle = route.params.headerTitle;

  // Estados para campos do formulário
  const [measures, setMeasures] = useState([{ description: '', sizeCm: '' }]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [originalMeasureIds, setOriginalMeasureIds] = useState([]);

  // Erros para validação
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Funções para alterar os campos com validação em tempo real
  const handleNameChange = (value) => {
    setName(value);
    validateName(value, setNameError);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    validateEmailOptional(value, setEmailError);
  };

  const handlePhoneChange = (value) => {
    const maskedPhone = applyPhoneMask(value);
    setPhone(maskedPhone);
    validatePhoneOptional(maskedPhone, setPhoneError);
  };

  // Carrega os dados do cliente e medidas se estiver editando
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (!clientId) return;

      const fetchData = async () => {
        try {
          const user = auth.currentUser;
          if (!user) return;

          // Carrega dados do cliente
          const docRef = doc(db, 'users', user.uid, 'clients', clientId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && isActive) {
            const data = docSnap.data();
            setName(data.name || '');
            setEmail(data.email || '');
            setPhone(applyPhoneMask(data.phone || ''));
            setPhotoUri(data.photoURL || null);
          }

          // Carrega medidas
          const measuresCol = collection(db, 'users', user.uid, 'clients', clientId, 'measurements');
          const measuresSnap = await getDocs(measuresCol);
          if (isActive) {
            const loaded = measuresSnap.docs.map(measure => ({
              id: measure.id,
              description: measure.data().description,
              sizeCm: String(measure.data().sizeCm),
            }));
            setMeasures(loaded);
            setOriginalMeasureIds(loaded.map(measure => measure.id));
          }
        } catch (err) {
          console.error('Erro ao carregar cliente:', err);
        }
      };

      fetchData();
      return () => { isActive = false };
    }, [clientId])
  );

  // Solicita permissão para acessar a galeria
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Precisamos de permissão para acessar suas fotos.');
      }
    })();
  }, []);

  // Seleciona imagem da galeria
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

  // Adiciona nova medida
  // Passa por todas as medidas e adiciona mais uma
  const createAddMeasure = () => {
    setMeasures(prev => [...prev, { description: '', sizeCm: '' }]);
  };

  // Atualiza um campo específico (description ou sizeCm) de uma medida no array,
  // criando uma cópia do estado para manter a imutabilidade, pois o React só detecta
  // mudanças se a referência do estado for alterada.
  const updateMeasure = (index, field, value) => {
    setMeasures(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Remove a medida no índice especificado, criando um novo array sem esse item
  const removeMeasure = index => setMeasures(prev => prev.filter((_, i) => i !== index));

  // Salva cliente e medidas
  const handleSave = async () => {
    setLoading(true);
    try {
      // Validação dos campos
      const isNameValid = validateName(name, setNameError);
      const isEmailValid = validateEmailOptional(email, setEmailError);
      const isPhoneValid = validatePhoneOptional(phone, setPhoneError);
      if (!isNameValid || !isEmailValid || !isPhoneValid) return;

      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado");

      const clientsCol = collection(db, 'users', user.uid, 'clients');
      const clientRef = editingClient ? doc(db, 'users', user.uid, 'clients', editingClient.id) : doc(clientsCol);
      const clientId = clientRef.id;

      let photoURL = editingClient?.imagemUrl || null;

      // Se mudou a imagem, faz upload para o Firebase
      if (photoUri && photoUri !== editingClient?.imagemUrl) {
        if (editingClient?.imagemUrl) {
          const oldRef = ref(storage, `users/${user.uid}/clients/${clientId}/photo.jpg`);
          await deleteObject(oldRef).catch(() => {});
        }
        const response = await fetch(photoUri);
        const blob = await response.blob();
        const imageRef = ref(storage, `users/${user.uid}/clients/${clientId}/photo.jpg`);
        await uploadBytes(imageRef, blob, { contentType: 'image/jpeg' });
        photoURL = await getDownloadURL(imageRef);
      }

      const batch = writeBatch(db);
      const phoneNumbers = phone.replace(/\D/g, '');// Armazena o telefone sem máscara (apenas os dígitos), como é recomendado


      // Salva dados do cliente usando batch que é uma especie de compilado de dados para serem mandados de uma vez
      batch.set(clientRef, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phoneNumbers,
        ...(photoURL && { photoURL })
      }, { merge: true });

      // Lida com medidas
      // - Atualiza medidas existentes (com id)
      // - Cria novas medidas (sem id)
      // - Remove medidas que foram deletadas pelo usuário

      const measuresCol = collection(db, 'users', user.uid, 'clients', clientId, 'measurements');
      const currentIds = measures.map(m => m.id).filter(Boolean);
      const idsToDelete = originalMeasureIds.filter(id => !currentIds.includes(id));

      measures.forEach(m => {
        const mRef = m.id ? doc(measuresCol, m.id) : doc(measuresCol);
        batch.set(mRef, {
          description: m.description,
          sizeCm: Number(m.sizeCm)
          // Se a medida já existe (tem id), atualiza só os campos informados mantendo o resto (merge: true)
          // Se for nova (sem id), cria um documento do zero (merge: false)
        }, { merge: m.id ? true : false });
      });

      idsToDelete.forEach(id => {
        const mRef = doc(measuresCol, id);
        batch.delete(mRef);
      });

      await batch.commit();
      Alert.alert('Sucesso', 'Cliente e medidas salvos!');
      navigation.goBack();
    } catch (error) {
      console.error('Código:', error.code);
      console.error('Mensagem:', error.message);
      console.error('Resposta do servidor:', error.customData?.serverResponse);
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen loading={loading} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        enableOnAndroid={true}
        extraScrollHeight={250}
      >
        <Header headerTitle={headerTitle} navigation={navigation} onSave={handleSave} />

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Informações do Cliente</Text>

        <View style={[styles.formContainer, { backgroundColor: colors.clientContainer }]}>
          <ChoosePictureButton onPress={pickImage} uri={photoUri} />

          <View>
            <TextField placeholder="Nome" value={name} onChangeText={handleNameChange} />
            <ErrorText error={nameError} />
          </View>

          <View>
            <TextField placeholder="Email" value={email} onChangeText={handleEmailChange} keyboardType="email-address" autoCapitalize="none" />
            <ErrorText error={emailError} />
          </View>

          <View>
            <TextField placeholder="Telefone" value={phone} onChangeText={handlePhoneChange} keyboardType="phone-pad" />
            <ErrorText error={phoneError} />
          </View>

          <Text style={[styles.sectionSubtitle, { color: colors.yellowTextDark }]}>Medidas do Cliente</Text>

          {measures.map((m, index) => (
            <MeasureTextField
              key={index}
              description={m.description}
              sizeCm={m.sizeCm}
              onChangeDescription={text => updateMeasure(index, 'description', text)}
              onChangeSizeCm={text => updateMeasure(index, 'sizeCm', text)}
              onDelete={() => removeMeasure(index)}
            />
          ))}

          <AddMeasureButton onPress={createAddMeasure} />
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
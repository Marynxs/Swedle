import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextField from '../components/TextField';
import MeasureTextField from '../components/ClientInfoScreen/MeasureTextField';
import AddMeasureButton from '../components/ClientInfoScreen/AddMeasureButton'
import ChoosePictureButton from '../components/ClientInfoScreen/ChoosePictureButton';
import Header from '../components/Header/Header'

import * as ImagePicker from 'expo-image-picker';

import { db, auth } from '../firebaseConfig';
import { doc, setDoc, collection, writeBatch} from 'firebase/firestore';


export default function ClientInfoScreen({ navigation, route }) {
    const { headerTitle } = route.params;
    const [measures, setMeasures] = useState([{ description: '', sizeCm: '' }]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [photoUri, setPhotoUri] = useState(null);

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
      mediaTypes: ['images'] ,
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


  // ✍️ AQUI: função que salva tudo no Firestore
  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    // 1) Referência à subcoleção de clientes do usuário
    const userClientsCol = collection(db, 'users', user.uid, 'clients');
    const clientRef      = doc(userClientsCol); // gera clientId
    const clientId       = clientRef.id;

    const batch = writeBatch(db);

    // 2) Grava o cliente dentro de users/{uid}/clients/{clientId}
    batch.set(clientRef, { name, email, phone });

    // 3) Subcoleção de medidas
    const measuresCol = collection(db, 'users', user.uid, 'clients', clientId, 'measurements');
    measures.forEach(m => {
      const mRef = doc(measuresCol);
      batch.set(mRef, {
        description: m.description,
        sizeCm: Number(m.sizeCm)
      });
    });

    await batch.commit();
    Alert.alert('Sucesso', 'Cliente e medidas salvos!');
    navigation.goBack();
  };
  
  
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        enableOnAndroid={true}
        extraScrollHeight={250}
      >
        <Header headerTitle={headerTitle} navigation={navigation} onSave={handleSave}/>

        <Text style={styles.sectionTitle}>Informações do Cliente</Text>
        <View style={styles.formContainer}>

          <ChoosePictureButton onPress={pickImage} uri={photoUri}/>

          <TextField placeholder="Nome" value={name} onChangeText={setName}  />

          <TextField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address"/>

          <TextField placeholder="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <Text style={styles.sectionSubtitle}>Medidas do Cliente</Text>
          
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
    backgroundColor: '#fff',
    paddingTop: 20,          
    paddingRight: 12
  },

  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontFamily: 'Inter_500Medium',
    color: "#323232"
  },
  formContainer: {
    backgroundColor: '#E7E7E7',
    borderRadius: 16,
    padding: 20,
    paddingBottom: 35
  },
  sectionSubtitle: {
    marginTop: 8,
    marginBottom: 8,
    color: '#838383',
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
  }
});

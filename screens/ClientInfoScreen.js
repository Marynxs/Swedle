import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextField from '../components/TextField';
import MeasureTextField from '../components/ClientInfoScreen/MeasureTextField';
import AddMeasureButton from '../components/ClientInfoScreen/AddMeasureButton'
import ChoosePictureButton from '../components/ClientInfoScreen/ChoosePictureButton';
import Header from '../components/Header/Header'

export default function ClientInfoScreen({ navigation }) {
    const [measures, setMeasures] = useState([0,1]);

    const createAddMeasure = () => {
      setMeasures(prev => [...prev, prev.length]);
    };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        enableOnAndroid={true}
        extraScrollHeight={150}
      >
        <Header headerTitle={'Clientes'} navigation={navigation}/>

        <Text style={styles.sectionTitle}>Informações do Cliente</Text>
        <View style={styles.formContainer}>

          <ChoosePictureButton/>

          <TextField placeholder="Nome" />

          <TextField placeholder="Email" keyboardType="email-address"/>

          <TextField placeholder="Telefone" keyboardType="phone-pad" />

          <Text style={styles.sectionSubtitle}>Medidas do Cliente</Text>
          
          {measures.map(index => (
            <MeasureTextField key={index} />
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

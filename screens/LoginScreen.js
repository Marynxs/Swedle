import { StyleSheet, Platform} from 'react-native';
import {useState} from 'react'
import LogoFull from '../components/LogoFull';
import TextField from '../components/TextField';
import SignInSignUpButton from '../components/SignInSignUpButton';
import RedirectText from '../components/RedirectText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // if(!email.includes('@') || senha.length < 6){
    //   Alert.alert('Login é inválido')
    //   alert('Login é inválido')
    // }
    // else{
    //   navigation.replace('Nav-Tela2')
    // }
    navigation.replace('Clients')
  }

  const navigateToRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={50}
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
    >
        <LogoFull />

        <TextField value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

        <TextField value={senha} onChangeText={setSenha} placeholder="Senha" security={true} />

        <RedirectText text="não possui uma conta?" link="Cadastre-se" onPress={navigateToRegister}/>

        <SignInSignUpButton title="Entrar" onPress={() => navigation.replace('Tela_Clientes')} />

    </KeyboardAwareScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,          
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  keyboardAvoiding: {
      flex: 1,
      backgroundColor: '#fff',   
  },
  scrollView: {
      flex: 1,
      backgroundColor: '#fff',   
  },

});


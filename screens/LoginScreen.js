import { StyleSheet,KeyboardAvoidingView, ScrollView, Platform,} from 'react-native';
import react, {useState} from 'react'
import LogoFull from '../components/LogoFull';
import TextField from '../components/TextField';
import SignInSignUpButton from '../components/SignInSignUpButton';
import RedirectText from '../components/RedirectText';



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
    return
  }

  const navigate = () => {
    alert("clique")
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
      behavior="padding"
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
        <LogoFull />

        <TextField value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

        <TextField value={senha} onChangeText={setSenha} placeholder="Senha" security={true} />

        <RedirectText text="não possui uma conta?" link="Cadastre-se" onPress={navigate}/>

        <SignInSignUpButton title="Entrar" onPress={handleLogin} />

      </ScrollView>
    </KeyboardAvoidingView>
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


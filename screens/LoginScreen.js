import {useState} from 'react'
import LogoFull from '../components/Login&RegisterScreen/LogoFull';
import TextField from '../components/TextField';
import SignInSignUpButton from '../components/Login&RegisterScreen/SignInSignUpButton';
import RedirectText from '../components/Login&RegisterScreen/RedirectText';
import ScreenView from '../components/Login&RegisterScreen/ScreenView';


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
    <ScreenView>
      
          <LogoFull />

          <TextField value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

          <TextField value={senha} onChangeText={setSenha} placeholder="Senha" security={true} />

          <RedirectText text="não possui uma conta?" link="Cadastre-se" onPress={navigateToRegister}/>

          <SignInSignUpButton title="Entrar" onPress={() => navigation.replace('Tela_Clientes')} />

    </ScreenView>

  );
}


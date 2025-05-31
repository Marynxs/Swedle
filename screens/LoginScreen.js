import {useState} from 'react'
import LogoFull from '../components/Login&RegisterScreen/LogoFull';
import TextField from '../components/TextField';
import GenericButton from '../components/GenericButton';
import RedirectText from '../components/Login&RegisterScreen/RedirectText';
import ScreenView from '../components/Login&RegisterScreen/ScreenView';
import ErrorText from '../components/Login&RegisterScreen/ErrorText';

import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };


  const verifyErrors = () => {
      setError('');
  
    if (!isValidEmail(email)) {
      setError("Email inválido");
      return false;
    }
    if (!isValidPassword(password)) {
      setError("Senha inválida");
      return false;
    }
      return true
    }

  const handleLogin = async () => {

      if (!verifyErrors()) {
        return
      }
      else {
        try {
          await signInWithEmailAndPassword(auth, email, password)
        }
        catch (error) {
        console.log(error.code);
        setError("Erro ao fazer login. Tente novamente.")
        }
      }

    
  }

  const navigateToRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <ScreenView>
      
          <LogoFull />

          <TextField value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

          <TextField value={password} onChangeText={setPassword} placeholder="Senha" security={true} />

          <ErrorText error={error}/>

          <RedirectText text="não possui uma conta?" link="Cadastre-se" onPress={navigateToRegister}/>

          <GenericButton title="Entrar" onPress={handleLogin} />

    </ScreenView>

  );
}


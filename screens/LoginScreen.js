// Importa hook para controlar o estado local dos campos e variáveis
import { useState } from 'react';

// Importa componentes da interface de login
import LogoFull from '../components/Login&RegisterScreen/LogoFull'; 
import TextField from '../components/TextField';                  
import GenericButton from '../components/GenericButton';       
import RedirectText from '../components/Login&RegisterScreen/RedirectText'; 
import ScreenView from '../components/Login&RegisterScreen/ScreenView';     
import ErrorText from '../components/Login&RegisterScreen/ErrorText';       
import LoadingScreen from '../components/LoadingScreen';    

import { isValidEmail, isValidPassword } from '../utils/Validator';

// Importa Firebase Auth
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Componente principal da tela de login
export default function LoginScreen({ navigation }) {
  // Campos de entrada
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado de carregamento e erro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  // Verifica se os campos foram preenchidos corretamente
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

    return true; 
  };

  // Função que lida com o login ao clicar no botão "Entrar"
  const handleLogin = async () => {
    // Se houver erros de validação, cancela o login
    if (!verifyErrors()) {
      return;
      
    } else {
      try {
        setLoading(true); // exibe tela de carregamento
        await signInWithEmailAndPassword(auth, email, password); // tenta logar com Firebase
      } catch (error) {
        //O firebase geralmente retorna um erro genérico por segurança então não é dito exatamente por que esta dando erro.
        console.log(error.code);
        setError("Erro ao fazer login. Tente novamente.");

      } finally {
        setLoading(false); // esconde o loading
      }
    }
  };

  // Navega para a tela de registro
  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  // Se estiver carregando, mostra a tela de carregamento
  if (loading) {
    return <LoadingScreen loading={loading} />;
  }

  return (
    <ScreenView>
      <LogoFull />

      <TextField
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />

      <TextField
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        security={true}
      />

      <ErrorText error={error} />

      <RedirectText
        text="não possui uma conta?"
        link="Cadastre-se"
        onPress={navigateToRegister}
      />

      <GenericButton
        title="Entrar"
        onPress={handleLogin}
      />
    </ScreenView>
  );
}

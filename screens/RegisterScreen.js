import React, { useState } from 'react';

// Componentes da tela de registro
import LogoFull from '../components/Login&RegisterScreen/LogoFull';
import TextField from '../components/TextField';
import GenericButton from '../components/GenericButton';
import RedirectText from '../components/Login&RegisterScreen/RedirectText';
import ErrorText from '../components/Login&RegisterScreen/ErrorText';
import ScreenView from '../components/Login&RegisterScreen/ScreenView';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import LoadingScreen from '../components/LoadingScreen';

// Validator
import { isValidEmail, isValidPassword } from '../utils/Validator';

// Tela de registro de usuário
export default function RegisterScreen({ navigation }) {
  // Estados dos campos de entrada
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado para exibir mensagens de erro ( Nessa tela so aparece embaixo dos dois campos )
  const [error, setError] = useState('');

  // Estado de carregamento (para exibir tela de loading)
  const [loading,setLoading] = useState(false)

  // Função chamada ao clicar no botão "Criar Conta"
  const handleRegister = async () => {
    // Verifica se há erros de validação nos campos (email/senha/confirmação de senha)
    if (!verifyErrors()) {
      return
    }
    else{
      try{
        setLoading(true) // mostra a tela de loading
        await createUserWithEmailAndPassword(auth, email, password) // tenta criar a conta no Firebase
      }
      // Trata os erros
      catch (error) {
        console.log(error)
        
        switch(error.code){
          case "auth/password-does-not-meet-requirements":
              setError("A senha deve ter no mínimo 6 caracteres, incluindo ao menos um número e uma letra maiúscula.");
              break
          case "auth/invalid-email":
              setError("Email invalido");
              break
          default:
              setError("Erro ao criar a conta")
              break
        }
        }
        finally{
          // esconde a tela de loading depois de passar por todo o try/catch
          // ou seja se conseguiu criar a conta ou nao coloca loading como falso
          setLoading(false) 
        }
      }

  };

  // Verifica possíveis erros de entrada (email inválido, senha inválida ou senhas diferentes)
  const verifyErrors = () => {
    setError('');

    if (!isValidEmail(email)) {
      setError("Digite um email válido");
      return false;
    }
    if (!isValidPassword(password) || !isValidPassword(confirmPassword)) {
      setError("A senha deve ter no mínimo 6 caracteres, incluindo ao menos um número e uma letra maiúscula.");
      return false;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return false;
    }

    return true
  }

  // Volta para a tela de login caso clique em Entrar
  const navigateToLogin = () => {
    navigation.goBack();
  };

  // Se estiver carregando (ex: tentando cadastrar), exibe a tela de loading
  if (loading) {
    return <LoadingScreen loading={loading} />;
  }

  return (
  <ScreenView>
      <LogoFull />

      <TextField value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

      <TextField value={password} onChangeText={setPassword} placeholder="Senha" security />

      <TextField value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirme sua Senha" security />

      <ErrorText error={error}/>
      
      <RedirectText text="já possui uma conta?" link="Entrar" onPress={navigateToLogin} />

      <GenericButton title="Criar Conta" onPress={handleRegister} />

  </ScreenView>
  );
}

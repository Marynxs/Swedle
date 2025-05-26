import React, { use, useState } from 'react';

import LogoFull from '../components/Login&RegisterScreen/LogoFull';
import TextField from '../components/TextField';
import SignInSignUpButton from '../components/Login&RegisterScreen/SignInSignUpButton';
import RedirectText from '../components/Login&RegisterScreen/RedirectText';
import ErrorText from '../components/Login&RegisterScreen/ErrorText';
import ScreenView from '../components/Login&RegisterScreen/ScreenView';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError]                 = useState('');

  const handleRegister = async () => {

    if (!verifyErrors()) {
      return
    }
    else{
      try{
        const user = await createUserWithEmailAndPassword(auth, email, password)
        if (user)
          navigation.replace('Clients')
      }
      catch (error) {
        console.log(error)
        
        switch(error.code){
          case "auth/password-does-not-meet-requirements":
              setError("A senha deve ter no mínimo 6 caracteres, incluindo ao menos um número e uma letra maiúscula.");
              break
          default:
              setError("Erro ao criar a conta")
              break
        }
        }
      }

  };


  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  };



  const verifyErrors = () => {
    setError('');

    if (!isValidEmail(email)) {
      setError("Digite um email válido");
      return false;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return false;
    }

    return true
  }

  const navigateToLogin = () => {
    navigation.goBack();
  };

  return (
  <ScreenView>
      <LogoFull />

      <TextField value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

      <TextField value={password} onChangeText={setPassword} placeholder="Senha" security />

      <TextField value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirme sua Senha" security />

      <ErrorText error={error}/>
      
      <RedirectText text="já possui uma conta?" link="Entrar" onPress={navigateToLogin} />

      <SignInSignUpButton title="Criar Conta" onPress={handleRegister} />

  </ScreenView>
  );
}

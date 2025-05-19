import React, { useState } from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LogoFull from '../components/LogoFull';
import TextField from '../components/TextField';
import SignInSignUpButton from '../components/SignInSignUpButton';
import RedirectText from '../components/RedirectText';
import ErrorText from '../components/ErrorText';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError]                 = useState('');

  const handleRegister = () => {
    setError('');

    if (!verifyErrors()) {
      return
    }

    // prosseguir com o cadastro...
  };

  const verifyErrors = () => {


    if (email.length === 0) {
      setError('O campo de email esta vázio');
      return false;
    }
    if (password.length === 0) {
      setError('O campo de senha esta vázio');
      return false;
    }
    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.');
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

      <TextField value={password} onChangeText={setPassword} placeholder="Senha" security />

      <TextField value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirme sua Senha" security />

      <ErrorText error={error}/>
      
      <RedirectText text="já possui uma conta?" link="Entrar" onPress={navigateToLogin} />

      <SignInSignUpButton title="Criar Conta" onPress={handleRegister} />

    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

});

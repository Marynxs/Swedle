import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import HeaderClientConfig from '../components/Header/HeaderClient&Config';
import ConfigCard from '../components/ConfigCard';
import GenericButton from '../components/GenericButton';

import { auth } from '../firebaseConfig';
import { useTheme } from '../hooks/useTheme';

import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth";
import LoadingScreen from '../components/LoadingScreen';


export default function ConfigScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  const [errorCurrentPasswordEmail, setErrorCurrentPasswordEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('')


  const [errorCurrentPasswordPassword, setErrorCurrentPasswordPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('')
  

  function handleLogout() {
    auth
      .signOut()
      .catch((error) => {
        console.error('Erro ao deslogar:', error);
      });
  }

async function reauthenticateUser(user, currentPassword) {

      if (!user) throw new Error('Usuário não autenticado.');

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
}

async function handleChangeEmail(newEmail, currentPassword) {

  setErrorEmail('')
  setErrorCurrentPasswordEmail('')
  
  setLoading(true)

  let error = false;

  if (!newEmail) {
    setErrorEmail('Você deve digitar o novo e-mail.');
    error = true;
  }

  if (!currentPassword) {
    setErrorCurrentPasswordEmail('Você deve digitar sua senha atual.');
    error = true;
  }

  if (error) {
    return;
  }

  try {
    const user = auth.currentUser;
    await reauthenticateUser(user, currentPassword)

    await updateEmail(user, newEmail);
    Alert.alert('Sucesso', 'E-mail atualizado com sucesso!');
  } catch (err) {
    console.error(err);
    let message = 'Erro ao tentar alterar o e-mail.';
    if (err.code === 'auth/wrong-password') {
      let messagePassword = 'Senha atual incorreta.';
      setErrorCurrentPasswordEmail(messagePassword)
    } 
    if (err.code === 'auth/invalid-email') {
      message = 'Formato de e-mail inválido.';
    } else if (err.code === 'auth/email-already-in-use') {
      message = 'Este e-mail já está em uso.';
    } else if (err.code === 'auth/requires-recent-login') {
      message = 'Sessão expirada. Faça login novamente.';
    }
    setErrorEmail(message)
  }
  finally{
    setLoading(false)
  }
}

  async function handleChangePassword(newPassword, currentPassword) {
    setErrorPassword('');
    setErrorCurrentPasswordPassword('');

    setLoading(true)

    let error = false

    if (!newPassword) {
      setErrorPassword('Você deve digitar sua nova senha.')
      error = true
    }
    if (!currentPassword) {
      setErrorCurrentPasswordPassword('Você deve digitar sua senha atual.')
      error = true
    }

    if (error) {
      return
    }

    try {
      const user = auth.currentUser;
      await reauthenticateUser(user, currentPassword)

      await updatePassword(user, newPassword);
      Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
    } catch (err) {
      console.error(err);
      let message = 'Erro ao tentar alterar a senha.';
      if (err.code === 'auth/wrong-password') {
        let messagePassword = 'Senha atual incorreta.';
        setErrorCurrentPasswordPassword(messagePassword)
      } 
      if (err.code === 'auth/weak-password') {
        message = 'Senha muito fraca. Utilize no mínimo 6 caracteres.';
      } else if (err.code === 'auth/requires-recent-login') {
        message = 'Sessão expirada. Faça login novamente.';
      }
      setErrorPassword(message)
    }
    finally{
      setLoading(false)
    }
  }

  if (loading) {
  return <LoadingScreen loading={loading} />;
  }

  return (
    <KeyboardAvoidingView
       style={[styles.container, { backgroundColor: colors.background }]}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} 
     >

      <View style={styles.header}>
        <HeaderClientConfig title="Configurações" />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
      >
        <ConfigCard
          action="Trocar Email"
          placeHolderText="Digite o novo email"
          onSubmit={(newEmail, currentPassword) => handleChangeEmail(newEmail, currentPassword)}
          icon={<Feather name="mail" size={20} color={colors.foreground} />}
          errorAction={errorEmail}
          errorCurrentPassword={errorCurrentPasswordEmail}
        />

        <ConfigCard
          action="Trocar Senha"
          placeHolderText="Digite a nova senha"
          onSubmit={(newPassword, currentPassword) => handleChangePassword(newPassword, currentPassword)}
          icon={<Feather name="lock" size={20} color={colors.foreground} />}
          errorAction={errorPassword}
          errorCurrentPassword={errorCurrentPasswordPassword}
        />

        <ConfigCard
          action="Mudar Tema"
          isSwitch={true}
          switchValue={isDark}
          onToggleSwitch={toggleTheme}
          icon={isDark ? <Feather name="moon" size={20} color={colors.foreground} /> : <Feather name="sun" size={20} color={colors.foreground} /> }
        />

        <View style={styles.buttonView}>
            <GenericButton
            title="Sair da Conta"
            onPress={handleLogout}
            styleButton={{
                width: '60%',
                marginTop: 20,
            }}
            styleText={{
                fontSize: 20,
            }}
            />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,              
  },
  header: { 
    alignItems: 'flex-start',
    paddingHorizontal: 44,
    paddingTop: 90,
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    paddingHorizontal: 25, 
    paddingTop: 20,       
    paddingBottom: 40,   

  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

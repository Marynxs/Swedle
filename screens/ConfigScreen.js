import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import HeaderClientConfig from '../components/Header/HeaderClient&Config';
import ConfigCard from '../components/ConfigCard';
import GenericButton from '../components/GenericButton';

import { auth } from '../firebaseConfig';
import { useTheme } from '../hooks/useTheme';

export default function ConfigScreen() {
  const { colors, isDark, toggleTheme } = useTheme();

  function handleLogout() {
    auth
      .signOut()
      .catch((error) => {
        console.error('Erro ao deslogar:', error);
      });
  }

    async function handleChangeEmail(novoEmail) {
    if (!novoEmail) {
      Alert.alert('Erro', 'Digite o novo e-mail.');
      return;
    }

    Alert.prompt(
      'Confirmação de Segurança',
      'Digite sua senha atual para confirmar a troca de e-mail:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async (senhaAtual) => {
            try {
              const user = authInstance.currentUser;
              if (!user) throw new Error('Usuário não autenticado.');

              const credential = EmailAuthProvider.credential(
                user.email,
                senhaAtual
              );
              await reauthenticateWithCredential(user, credential);

              await updateEmail(user, novoEmail);
              Alert.alert('Sucesso', 'E-mail atualizado com sucesso!');
            } catch (err) {
              console.error(err);
              let mensagem = 'Erro ao tentar alterar o e-mail.';
              if (err.code === 'auth/wrong-password') {
                mensagem = 'Senha incorreta. Tente novamente.';
              } else if (err.code === 'auth/invalid-email') {
                mensagem = 'Formato de e-mail inválido.';
              } else if (err.code === 'auth/email-already-in-use') {
                mensagem = 'Este e-mail já está em uso.';
              }
              Alert.alert('Falha', mensagem);
            }
          },
        },
      ],
      'secure-text'
    );
  }

    async function handleChangePassword(novaSenha) {
    if (!novaSenha) {
      Alert.alert('Erro', 'Digite a nova senha.');
      return;
    }

    Alert.prompt(
      'Confirmação de Segurança',
      'Digite sua senha atual para confirmar a troca:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async (senhaAtual) => {
            try {
              const user = authInstance.currentUser;
              if (!user) throw new Error('Usuário não autenticado.');

              const credential = EmailAuthProvider.credential(
                user.email,
                senhaAtual
              );
              await reauthenticateWithCredential(user, credential);

              if (novaSenha.length < 6) {
                Alert.alert(
                  'Erro',
                  'A senha deve ter no mínimo 6 caracteres.'
                );
                return;
              }

              await updatePassword(user, novaSenha);
              Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
            } catch (err) {
              console.error(err);
              let mensagem = 'Erro ao tentar alterar a senha.';
              if (err.code === 'auth/wrong-password') {
                mensagem = 'Senha atual incorreta.';
              } else if (err.code === 'auth/weak-password') {
                mensagem = 'Senha muito fraca. Use no mínimo 6 caracteres.';
              }
              Alert.alert('Falha', mensagem);
            }
          },
        },
      ],
      'secure-text'
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={styles.header}>
        <HeaderClientConfig title="Configurações" />
      </View>

      <View style={styles.cardsContainer}>
        <ConfigCard
          action="Trocar Email"
          placeHolderText="Digite o novo email"
          onPress={handleChangeEmail}
          icon={<Feather name="mail" size={20} color={colors.foreground} />}
        />

        <ConfigCard
          action="Trocar Senha"
          placeHolderText="Digite a nova senha"
          onPress={handleChangePassword}
          icon={<Feather name="lock" size={20} color={colors.foreground} />}
        />

        <ConfigCard
          action="Mudar Tema"
          isSwitch={true}
          switchValue={isDark}
          onToggleSwitch={toggleTheme}
          icon={<Feather name="moon" size={20} color={colors.foreground} />}
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
      </View>
    </View>
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

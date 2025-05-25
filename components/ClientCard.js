import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ClientCard({nome, telefone, imagem, onPress}){
    return(
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={imagem} style={styles.avatar}/>
            <View>
                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.telefone}>{telefone}</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#323232" style={styles.seta} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
      width:'100%',
      backgroundColor: '#F0BC20', 
      padding: 25,
      marginVertical: 8,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative'
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 40,
      marginRight: 15
    },
    nome: {
      fontWeight: '400',
      fontSize: 18,
      color: '#323232'
    },
    telefone: {
      color: '#323232',
      fontSize: 12
    },
    seta: {
      position: 'absolute',
      right: 25
    }
  });
  
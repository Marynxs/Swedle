import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function GenericButton({ title, onPress, styleButton, styleText}) {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.button, styleButton]}>
            <Text style={[styles.text, styleText]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      width: '75%',
      backgroundColor: '#F0BC20',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    text: {
      color: '#000',
      fontSize: 25,
      fontFamily: 'Inter_700Bold'
    },
  });
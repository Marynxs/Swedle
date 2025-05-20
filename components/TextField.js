import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

export default function TextField({
  value,
  onChangeText,
  placeholder,
  security = false,
  keyboardType = 'default',
  style,
  inputStyle,
  lineStyle, 
  showLine = true 
}) {
  const [secure, setSecure] = useState(security);

  return (
    <>
      <View style={[styles.wrapper, style]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#848484"
          keyboardType={keyboardType}
          secureTextEntry={secure}
        />
        {security && (
          <TouchableOpacity
            onPress={() => setSecure((s) => !s)}
            style={styles.iconButton}
          >
            <Image source={ secure ? require('../assets/Olho Fechado.png') : require('../assets/Olho Aberto.png') }
            style={styles.iconButton}
            />
          </TouchableOpacity>
        )}
      </View>
      {showLine !== false && (
        <View style={[styles.rectangle, lineStyle]} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',  
    alignItems: 'center',
    width: '75%',
  },
  input: {
    flex: 1,                    
    height: 40,
    fontSize: 16,
    padding: 0,
    fontFamily: 'Inter_500Medium',
  },
  iconButton: {
    height:30,
    width: 30,
    padding: 4,     
    marginRight: 5,          
  },
  rectangle: {
    width: '75%',
    height: 2,
    backgroundColor: '#848484',
    borderRadius: 4,
    marginBottom: 22,
  },
});

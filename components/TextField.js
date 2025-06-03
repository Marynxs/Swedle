import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { useTheme } from '../context/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';


export default function TextField({
  value,
  onChangeText,
  placeholder,
  security = false,
  keyboardType = 'default',
  lineStyle,
}) {
  const {colors} = useTheme()
  const [secure, setSecure] = useState(security);

  return (
    <>
      <View style={styles.wrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, {color: colors.foreground}]}
          placeholder={placeholder}
          placeholderTextColor= {colors.placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secure}
        />
        {security && (
          <TouchableOpacity
            onPress={() => setSecure((s) => !s)}
            style={styles.iconButton}
          >
          {secure ? <Ionicons name="eye-off-outline" size={24} color={colors.foreground} /> 
          : <Ionicons name="eye" size={24} color={colors.foreground} />
          }
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.rectangle, lineStyle]} />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',  
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,                    
    height: 40,
    fontSize: 16,
    padding: 0,
    fontFamily: 'Inter_400Medium',
  },
  iconButton: {
    height:30,
    width: 30,
    padding: 4,     
    marginRight: 5,          
  },
  rectangle: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#848484',
    borderRadius: 4,
    marginBottom: 22,
  },
});

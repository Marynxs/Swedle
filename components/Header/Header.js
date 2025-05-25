import React, { useState } from 'react';
import { View,Text, StyleSheet, TouchableOpacity} from 'react-native';


import { Ionicons } from '@expo/vector-icons';
import SaveOrMenu from './SaveOrMenu';

export default function Header({
  navigation,
  headerTitle,
  onSave,          
  menuItems = []   
}) {


  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.back}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="chevron-back" size={24} color="#323232" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{headerTitle}</Text>

      <SaveOrMenu onSave={onSave} menuItems={menuItems}/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 45,
    marginBottom: 45,
  },
  back: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: -8,
    zIndex: 1,
  },
  backText: {
    fontFamily: 'Inter_400Regular',
    color: '#323232',
    fontSize: 14,
    marginLeft: 4,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: '#323232',
  },
});

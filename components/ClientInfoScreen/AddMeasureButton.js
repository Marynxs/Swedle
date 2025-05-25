// components/AddMeasureButton.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AddMeasureButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Feather name="plus" size={16} color="#ffffff" />
      </View>
      <Text style={styles.addButtonText}>Adicionar Medida</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 20
  },
  addButtonText: {
    marginLeft: 2,
    fontWeight: '500',
    fontFamily: 'Inter_400Regular',
    marginRight: 6
  },
  iconWrapper: {
    backgroundColor: '#323232',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3
  }
});

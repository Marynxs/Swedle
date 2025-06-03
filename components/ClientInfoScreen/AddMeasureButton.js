// components/AddMeasureButton.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/hooks/useTheme';

export default function AddMeasureButton({ onPress }) {
  const {colors} = useTheme()
  return (
    <TouchableOpacity style={[styles.addButton, {backgroundColor: colors.background}]} onPress={onPress}>
      <View style={[styles.iconWrapper, {backgroundColor: colors.yellowTextDark}]}>
        <Feather name="plus" size={16} color={colors.buttonPlus} />
      </View>
      <Text style={[styles.addButtonText, {color: colors.yellowTextDark}]}>Adicionar Medida</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3
  }
});

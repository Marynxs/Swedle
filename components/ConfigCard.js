import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import TextField from './TextField';
import ErrorText from './Login&RegisterScreen/ErrorText'

export default function ConfigCard({ action, onSubmit, isSwitch = false, switchValue, onToggleSwitch, icon, placeHolderText, errorCurrentPassword, errorAction }) {
  const {colors} = useTheme()
  const [expanded, setExpanded] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('')
  const [value, setValue] = useState('');

  const handleToggleExpand = () => {
    if (!isSwitch) {
      setExpanded(prev => !prev);
    }
  };

  const handleSave = () => {
    if (onSubmit) {
      onSubmit(value, currentPassword);
    }

  };

  return (
    <View style={[styles.card, expanded && styles.cardExpanded, {color: colors.background}]}>
      <TouchableOpacity 
        onPress={handleToggleExpand}
        activeOpacity={0.7}
        disabled={isSwitch}
        style={styles.topRow}
      >
        <View style={styles.leftSection}>
          {icon}
          <Text style={[styles.action, {color: colors.foreground}]}>{action}</Text>
        </View>

        {isSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onToggleSwitch}
            style={styles.switch}
            trackColor={{ false: '#DFDDDD', true: '#454545' }}
            thumbColor={'#ffffff'}
            ios_backgroundColor="#DFDDDD"
          />
        ) : (
          <Feather
            name="chevron-right"
            size={24}
            color="#323232"
            style={[styles.seta, expanded && { transform: [{ rotate: '90deg' }] }, {color: colors.foreground}]}
          />
        )}
      </TouchableOpacity>

      {!isSwitch && expanded && (
        <View style={styles.expandedContent}>

          <TextField
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder={'Digite sua senha atual'}
            placeholderTextColor={colors.placeholder} 
            security = {true}
          />
          <ErrorText error={errorCurrentPassword}/>


          <TextField
            value={value}
            onChangeText={setValue}
            placeholder={placeHolderText}
            placeholderTextColor={colors.placeholder} 
            keyboardType={action.includes('Email') ? 'email-address' : 'default'}
            security={action.toLowerCase().includes('senha')}
          />
          <ErrorText error={errorAction}/>

          <TouchableOpacity style={styles.editButton} onPress={handleSave}>
            <Text style={styles.editButtonText}>Alterar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DFDDDD',
  },
  cardExpanded: {
    paddingBottom: 30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  action: {
    fontWeight: '400',
    fontSize: 18,
    color: '#323232'
  },
  seta: {
    alignSelf: 'center'
  },
  switch: {
    alignSelf: 'center'
  },
  expandedContent: {
    marginTop: 15
  },
  editButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: '#F0BC20',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6
  },
  editButtonText: {
    color: '#000',
    fontSize: 13,
    fontFamily: 'Inter_500Medium'
  }
});
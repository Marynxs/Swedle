import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function ConfigCard({action, onPress, isSwitch = false, switchValue, onToggleSwitch, icon}){
    return(
        <TouchableOpacity 
            style={styles.card} 
            onPress={!isSwitch ? onPress : null} 
            activeOpacity={isSwitch ? 1 : 0.7} 
        >
          <View style={styles.leftSection}>
              {icon}
              <Text style={styles.action}>{action}</Text>
          </View>
          {isSwitch ? (
                <Switch
                value={switchValue}
                onValueChange={onToggleSwitch}
                style={styles.switch}
                />
            ) : (
                <Feather name="chevron-right" size={24} color="#323232" style={styles.seta} />
          )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
      width:'100%',
      backgroundColor: '#FFFFFF', 
      padding: 20,
      marginVertical: 10,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      borderWidth: 1,
      borderColor: '#DFDDDD'
    },
    action: {
      fontWeight: '400',
      fontSize: 18,
      color: '#323232'
    },
    seta: {
      position: 'absolute',
      right: 25
    }, 
    switch: {
    position: 'absolute',
    right: 20,
    },
    leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    }
  });
  
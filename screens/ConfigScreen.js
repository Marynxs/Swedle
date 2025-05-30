import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderClientConfig from '../components/Header/HeaderClient&Config';
import ConfigCard from '../components/ConfigCard';
import { Feather } from '@expo/vector-icons';

export default function ConfigScreen(){
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        // aqui você pode adicionar lógica real de troca de tema
    };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderClientConfig title='Configurações'/>
            </View>
            <View style={styles.cards}>
                <ConfigCard action='Trocar Email' onPress={() => {}}  icon={<Feather name="mail" size={20} color="#323232" />}/>
                <ConfigCard action='Trocar Senha' onPress={() => {}}  icon={<Feather name="lock" size={20} color="#323232" />}/>
                <ConfigCard
                    action='Mudar Tema'
                    isSwitch={true}
                    switchValue={isDarkTheme}
                    onToggleSwitch={toggleTheme}
                    icon={<Feather name="moon" size={20} color="#323232" />}
                />
            </View>
            <TouchableOpacity onPress={()=>{}} style={styles.button}>
                <Text style={styles.text}>Sair da Conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 33,
        backgroundColor: '#ffffff',
      },
      header: {
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 35,
        paddingRight: 44,
        paddingLeft: 44,
        paddingTop: 42
      },
      cards: {
        marginHorizontal: 25,
      },
      button: {
        width: '50%',
        backgroundColor: '#F0BC20',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 85,
     },
     text: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'Inter_700Bold'
     },
})


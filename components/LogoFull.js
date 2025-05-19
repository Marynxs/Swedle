import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function LogoFull() {
    return (
    <>
        <Image
        source={require('../assets/Logo.png')}
        style={styles.Logo}
        />
        <Image
        source={require('../assets/Texto.png')}
        style={styles.Texto}
        />
    </>
    )
}

export const styles = StyleSheet.create({
    Logo: {
        width: 62, 
        height: 119, 
        resizeMode:'contain'
    },
    Texto: {
        width: 300, 
        height: 133, 
        resizeMode:'contain',

    }
})


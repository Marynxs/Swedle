import React from 'react';
import {Image, StyleSheet} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function LogoFull() {
    const {isDark} = useTheme()
    return (
    <>
        <Image
        source={isDark ? require('../../assets/LogoAmarelo.png') : require('../../assets/LogoPreto.png')}
        style={styles.Logo}
        />
        <Image
        source={isDark ? require('../../assets/TextoAmarelo.png') :require('../../assets/TextoPreto.png')}
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


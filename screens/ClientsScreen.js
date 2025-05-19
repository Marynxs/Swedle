import React from "react";
import { Text, StyleSheet } from "react-native";

export default function ClientsScreen() {

    return(
        <Text style={styles.text}>Clientes</Text>

    )
}

const styles = StyleSheet.create ({
    text: {
        fontSize: 20,
        backgroundColor: 'green',
        flex:1
    }


})
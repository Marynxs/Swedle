import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList} from 'react-native';


export default function Measurements({ medidas = []}) {

    return (
        <View style={styles.card}>
            <View style={styles.imagemContainer}>
                <Image source={require('../assets/manequim.png')} style={styles.imagem} />
            </View>
            <View style={styles.medidasContainer}>
                <FlatList
                style={{ height: 260}}
                showsVerticalScrollIndicator={true}
                data={medidas}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.linha}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={styles.valor}>{item.valor}cm</Text>
                    </View>
                )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0BC20',
    borderRadius: 20,
    flexDirection: 'row',
  },
  imagemContainer: {
    backgroundColor: '#E7E7E7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius:20,
    borderBottomLeftRadius: 20
  },
  imagem: {
    width: 90,
    height: 200,
    resizeMode: 'contain',
  },
  medidasContainer: {
    flex: 1,
    padding: 20,
    paddingRight: 10,
    justifyContent: 'center',
    maxHeight: 280,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 0.3,
    borderColor: '#323232',
    paddingBottom: 4,
    width:'92%'
  },
  label: {
    fontFamily: 'Inter_400Regular',
    color: '#323232',
  },
  valor: {
    fontFamily: 'Inter_500Medium',
    color: '#323232',
  },
})
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ClientMeasuresScreen({ route, navigation }) {
  const { cliente } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);

  const medidas = [
    { label: 'Busto', valor: '98' },
    { label: 'Torax', valor: '68' },
    { label: 'Cintura', valor: '92' },
    { label: 'Quadril', valor: '82' },
    { label: 'Pernas', valor: '92' },
    { label: 'Braços', valor: '28' },
  ];

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={styles.container}>
      {/* Overlay para fechar menu ao clicar fora */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.botaoVoltar}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#323232" />
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.nome}>{cliente.nome}</Text>

        <View style={{ position: 'relative', zIndex: 10 }}>
          <TouchableOpacity onPress={toggleMenu}>
            <Image source={require('../assets/bolinhas.png')} style={{ width: 26, height: 26, marginRight: 20 }} />
          </TouchableOpacity>
          {menuVisible && (
            <View style={styles.menu}>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Editar</Text>
                <Ionicons name="pencil-outline" size={18} color="#323232" />
              </TouchableOpacity>
              <View style={styles.menuDivider} />
              <TouchableOpacity style={styles.menuItem}>
                <Text style={[styles.menuText, { color: '#BE1515' }]}>Apagar</Text>
                <Ionicons name="trash-outline" size={18} color="#BE1515" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Medidas</Text>

      <View style={styles.card}>
        <View style={styles.imagemContainer}>
          <Image source={require('../assets/manequim.png')} style={styles.imagem} />
        </View>
        <View style={styles.medidasContainer}>
          <FlatList
            data={medidas}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => (
              <View style={styles.linha}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.valor}>{item.valor}cm</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginTop: 43,
    position: 'relative',
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    zIndex: 1
  },
  voltar: {
    fontSize: 14,
    color: '#323232',
    fontFamily: 'Inter_400Regular',
    marginLeft: 4,
  },
  nome: {
    position: 'absolute',
    left: 20,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#323232',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    marginBottom: 12,
    color: '#323232',
  },
  card: {
    backgroundColor: '#F0BC20',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imagemContainer: {
    backgroundColor: '#E7E7E7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    width: 90,
    height: 200,
    resizeMode: 'contain',
  },
  medidasContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 0.3,
    borderColor: '#323232',
    paddingBottom: 4,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    color: '#323232',
  },
  valor: {
    fontFamily: 'Inter_500Medium',
    color: '#323232',
  },
  menu: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    paddingVertical: 6,
    width: 140,
    zIndex: 999,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  menuText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#323232',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
});

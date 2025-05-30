import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function SaveOrMenu({
  onSave,          
  menuItems = []
}){

  const [menuVisible, setMenuVisible] = useState(false); 

  const toggleMenu = () => setMenuVisible(v => !v);         
  const closeMenu = () => setMenuVisible(false);

    return(
    <View style={styles.right}>
        {menuItems.length > 0 ? (
          <>
            <TouchableOpacity onPress={toggleMenu}>
              <Image
                source={require('../../assets/bolinhas.png')}
                style={styles.menuIcon}
              />
            </TouchableOpacity>

            <Modal
              transparent
              visible={menuVisible}
              animationType="none"
              onRequestClose={closeMenu}
            >
            {menuVisible && (
              <TouchableWithoutFeedback onPress={closeMenu}>
                <View style={styles.overlay} />
              </TouchableWithoutFeedback>
            )}

            {menuVisible && (
              <View style={styles.menu}>
                {menuItems.map((item, i) => (
                  <View key={i}>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                        closeMenu();
                        item.onPress();
                      }}>

                      <Text style={[ styles.menuText, item.color ? { color: item.color } : null ]}> {item.label} </Text>

                      <Ionicons name={item.iconName} size={18} color={item.color || '#323232'} />
                      
                    </TouchableOpacity>

                    {i < menuItems.length - 1 && <View style={styles.menuDivider} />}
                  </View>
                ))}
              </View>
            )}
             </Modal>
          </>
        ) : (
          <TouchableOpacity onPress={onSave}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
        )}
      </View>
    )
    
} 

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 50,
    right: 25,
    width: 144,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 5,
  },
  menuIcon: {
    width: 35,
    height: 35,
    marginRight: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  menuText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    color: '#323232',
    fontSize: 14,
  },
  right: {
    width: 50,         
    alignItems: 'flex-end',
    zIndex: 5,
  },
  saveText: {
    fontFamily: 'Inter_400Regular',
    color: '#323232',
    fontSize: 14,
  },
  overlay: {
    position: 'absolute',
    top: -45 ,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 4,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
})
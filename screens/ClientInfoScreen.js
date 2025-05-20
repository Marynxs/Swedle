import React from 'react';
import { View, Text, StyleSheet, TextInput,TouchableOpacity, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather } from '@expo/vector-icons';
import TextField from '../components/TextField';

export default function ClientInfoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Clientes</Text>
          <TouchableOpacity>
            <Text style={styles.backButton}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Informações do Cliente</Text>
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/avatar5.png')} style={styles.profileImage} />
            <TouchableOpacity style={styles.editIcon}>
              <Feather name="camera" size={18} color="black#" />
            </TouchableOpacity>
          </View>

          <TextField
            placeholder="Nome"
            inputStyle={styles.inputs}
            style={styles.wrapper100}
            lineStyle={styles.line100}
            showLine={false}
            placeholderTextColor="#838383"
          />
          <TextField
            placeholder="Email"
            inputStyle={styles.inputs}
            style={styles.wrapper100}
            lineStyle={styles.line100}
            showLine={false}
            keyboardType="email-address"
            placeholderTextColor="#838383"
          />
          <TextField
            placeholder="Telefone"
            inputStyle={styles.inputs}
            style={styles.wrapper100}
            lineStyle={styles.line100}
            showLine={false}
            keyboardType="phone-pad"
            placeholderTextColor="#838383"
          />

          <Text style={styles.sectionSubtitle}>Medidas do Cliente</Text>

          <View style={styles.measureRow}>
            <View style={styles.measureNameWrapper}>
              <TextInput
                placeholder="Cintura"
                style={styles.measureNameInput}
                placeholderTextColor="#838383"
              />
            </View>
            <View style={styles.measureValueWrapper}>
              <Text style={styles.verticalLine} />
              <TextInput
                placeholder="00"
                keyboardType="numeric"
                style={styles.measureValueInput}
                placeholderTextColor="#838383"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
          </View>

          <View style={styles.measureRow}>
            <View style={styles.measureNameWrapper}>
              <TextInput
                placeholder="Busto"
                style={styles.measureNameInput}
                placeholderTextColor="#838383"
              />
            </View>
            <View style={styles.measureValueWrapper}>
              <Text style={styles.verticalLine} />
              <TextInput
                placeholder="00"
                keyboardType="numeric"
                style={styles.measureValueInput}
                placeholderTextColor="#838383"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.addButton}>
            <View style={styles.iconWrapper}>
              <Feather name="plus" size={16} color="#ffffff" />
            </View>
            <Text style={styles.addButtonText}>Adicionar Medida</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 45,
    marginTop: 45,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: "#323232"
  },
  backButton: {
    fontFamily: 'Inter_400Regular',
    color: "#323232",
    fontSize: 14
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontFamily: 'Inter_500Medium',
    color: "#323232"
  },
  formContainer: {
    backgroundColor: '#E7E7E7',
    borderRadius: 16,
    padding: 20,
    paddingBottom: 35
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: '38%',
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    padding: 6
  },
  inputs: {
    fontFamily: 'Inter_400Regular',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 25,
    marginHorizontal: 8,
    fontSize: 14
  },
  wrapper100: {
    width: '100%'
  },
  line100: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 20
  },
  sectionSubtitle: {
    marginTop: 8,
    marginBottom: 8,
    color: '#838383',
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
    fontSize: 15
  },
  measureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 8,
  },
  measureNameWrapper: {
    flex: 1,
    justifyContent: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  measureNameInput: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    paddingVertical: 0,
    height: '100%',
    textAlignVertical: 'center',
  },
  measureValueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingRight: 4,
  },
  measureValueInput: {
    width: 40,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    paddingVertical: 0,
    height: '100%',
    textAlignVertical: 'center',
  },
  verticalLine: {
    width: 1,
    height: '40%',
    backgroundColor: '#ccc',
    marginRight: 4,
  },
  unit: {
    marginLeft: 6,
    fontFamily: 'Inter_400Regular',
    color: '#888',
    fontSize: 14
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#323232',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3
  },
  scrollContainer: {
    paddingBottom: 60
  }
});

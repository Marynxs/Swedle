import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { ActivityIndicator,  TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//Telas
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ClientInfoScreen from './screens/ClientInfoScreen';
import ClientMeasuresScreen from './screens/ClientMeasuresScreen';

//Navegações
import Bottom_Tabs from './navigation/Bottom_Tabs';

export default function App() {
const Stack = createNativeStackNavigator()

const [fontsLoaded] = useFonts({
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
});

if (!fontsLoaded) {
  return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;
}

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{ headerShown: false }}
      >
      <Stack.Screen 
        name='Login' 
        component={LoginScreen} 
      />
      <Stack.Screen 
        name='Register' 
        options={({ navigation }) => ({
          headerShown: true,
          title: ' Voltar',
          headerShadowVisible: false,

          
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 5 }}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        })}
        component={RegisterScreen} 
      />
      <Stack.Screen name='Tela_Clientes' component={Bottom_Tabs} />
      <Stack.Screen name='Cadastro_Editar_Clientes' component={ClientInfoScreen}/>
      <Stack.Screen name='Medidas_Clientes' component={ClientMeasuresScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

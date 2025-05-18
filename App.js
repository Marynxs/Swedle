import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts, 
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_700Bold } from '@expo-google-fonts/inter';
import { ActivityIndicator } from 'react-native';

import LoginScreen from './screens/LoginScreen'

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
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

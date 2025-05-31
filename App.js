import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { ActivityIndicator,  TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from './context/auth/useAuth'
import { AuthProvider } from './context/auth/AuthProvider';

import { ThemeProvider } from './context/theme/ThemeProvider';
import { useTheme } from './hooks/useTheme';

//Telas
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ClientInfoScreen from './screens/ClientInfoScreen';
import ClientMeasuresScreen from './screens/ClientMeasuresScreen';

//Navegações
import Bottom_Tabs from './navigation/Bottom_Tabs';


//,,
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loaded } = useAuth();

  const {colors} = useTheme()

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded || loaded) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="ClientsScreen" component={Bottom_Tabs} />
            <Stack.Screen name="Cadastro_Editar_Clientes" component={ClientInfoScreen} />
            <Stack.Screen name="Medidas_Clientes" component={ClientMeasuresScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.background,
                },
                headerTintColor: colors.foreground,
                title: 'Voltar',
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 5 }}>
                    <Ionicons name="arrow-back" size={24} color={colors.foreground} />
                  </TouchableOpacity>
                ),
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

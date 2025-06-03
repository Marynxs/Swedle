

// Importa os componentes de navegação da React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'

// Importa fontes da Google Fonts
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';

// Importa componentes básicos do React Native
import { TouchableOpacity, Platform  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//Hook para gerenciar o estado local
import { useState } from 'react';

// Importa hooks e providers do contexto de autenticação
import { useAuth } from './context/auth/useAuth'
import { AuthProvider } from './context/auth/AuthProvider';

// Importa o ThemeProvider e o hook useTheme para gerenciar temas (claro/escuro)
import { ThemeProvider } from './context/theme/ThemeProvider';
import { useTheme } from './hooks/useTheme';


// Importa Telas
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './components/LoadingScreen';
import ClientInfoScreen from './screens/ClientInfoScreen';
import ClientMeasuresScreen from './screens/ClientMeasuresScreen';
// Importa Tela que contem a splash screen
import SplashScreen from './components/SplashScreen';

// Importa Navegações
import Bottom_Tabs from './navigation/Bottom_Tabs';


// A lógica principal (rotas, splash, fontes) foi separada em AppContent
// porque useAuth e useTheme só funcionam dentro dos Providers
// Para manter o código limpo e evitar erros, os Providers envolvem o AppContent. 

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
  const { user, loaded } = useAuth(); // Pega o usuário logado e o status de carregamento
  const [showSplash, setShowSplash] = useState(true); // Controle da splash screen

  const {colors} = useTheme() // Pega cores do tema atual

  // Carrega a fonte inter usada no app
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  // Cria um stack navigator
  const Stack = createNativeStackNavigator();

  // Mostra o vídeo da splash screen no início (somente no app mobile pois no web ele não funciona e o video não roda)
  if (showSplash && Platform.OS !== "web") {
    return (
      <SplashScreen
        source={require('./assets/SplashScreen.mp4')}
        onVideoEnd={() => setShowSplash(false)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Se o usuário estiver logado, ou se logou anteriormente, mostra a tela de clientes
          <>
            <Stack.Screen name="ClientsScreen" component={Bottom_Tabs} />
            <Stack.Screen name="Cadastro_Editar_Clientes" component={ClientInfoScreen} />
            <Stack.Screen name="Medidas_Clientes" component={ClientMeasuresScreen} />
          </>
        ) : (
          // Caso contrário, mostra login e cadastro
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

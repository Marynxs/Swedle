import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from '../context/hooks/useTheme';

//Telas
import ConfigScreen from '../screens/ConfigScreen';
import ClientScreen from '../screens/ClientScreen';

export default function Bottom_Tabs(){
    const { colors } = useTheme();
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator initialRouteName='Clients' 
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.tabBarIconActive,
                tabBarInactiveTintColor: colors.tabBarIconInactive,
                tabBarStyle: {backgroundColor: colors.background},
                tabBarIcon: ({ color, size }) => {
                let iconName;
        
                if (route.name === 'Clients') {
                    iconName = 'people'; 
                } else if (route.name === 'Configurações') {
                    iconName = 'settings'; 
                }
        
                return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name="Clients" component={ClientScreen}/>
            <Tab.Screen name="Configurações" component={ConfigScreen} />
        </Tab.Navigator>
    );
}
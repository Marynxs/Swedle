import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

//Telas
import ConfigScreen from '../screens/ConfigScreen';
import ClientScreen from '../screens/ClientScreen';

export default function Bottom_Tabs(){
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator initialRouteName='Clientes' 
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#323232',
                tabBarInactiveTintColor: '#A6A6A6',
                tabBarIcon: ({ color, size }) => {
                let iconName;
        
                if (route.name === 'Clientes') {
                    iconName = 'people'; 
                } else if (route.name === 'Configurações') {
                    iconName = 'settings'; 
                }
        
                return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name="Clientes" component={ClientScreen}/>
            <Tab.Screen name="Configurações" component={ConfigScreen} />
        </Tab.Navigator>
    );
}
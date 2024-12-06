import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantallaInicioSesion from './pantallas/PantallaInicioSesion';
import PantallaBienvenida from './pantallas/PantallaBienvenida';
import PantallaRegistro from './pantallas/PantallaRegistro';
import { Ionicons } from 'react-native-vector-icons';

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        initialRouteName="Bienvenida"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Bienvenida') {
              iconName = 'home'; 
            } else if (route.name === 'InicioSesion') {
              iconName = 'log-in'; 
            } else if (route.name === 'Registrarse') {
              iconName = 'person-add';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray', 
        })}
      >
        <Tabs.Screen
          name="Bienvenida"
          component={PantallaBienvenida}
          options={{ title: 'Inicio' }}
        />
        <Tabs.Screen
          name="InicioSesion"
          component={PantallaInicioSesion}
          options={{ title: 'Iniciar Sesión' }}
        />
        <Tabs.Screen
          name="Registrarse"
          component={PantallaRegistro}
          options={{ title: 'Registrarse' }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

<<<<<<< Updated upstream
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
=======
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantallaInicioSesion from './pantallas/PantallaInicioSesion';
import PantallaBienvenida from './pantallas/PantallaBienvenida';
import PantallaRegistro from './pantallas/PantallaRegistro';
import { Ionicons } from 'react-native-vector-icons';
import Citas from './pantallas/citas';
import PantallaDetalles from './pantallas/PantallaDetalles';
import PantallaListadoMascotas from './pantallas/PantallaListadoMascotas';
import PantallaHistorialVacunas from './pantallas/PantallaHistorialVacunas';

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        initialRouteName="Bienvenida"
        screenOptions={({ route }: any) => ({
          tabBarIcon: ({ color, size }: any) => {
            let iconName;

            if (route.name === 'Bienvenida') {
              iconName = 'home';
            } else if (route.name === 'InicioSesion') {
              iconName = 'log-in';
            } else if (route.name === 'Registrarse') {
              iconName = 'person-add';
            } else if (route.name === 'Detalles') {
              iconName = 'information-circle';
            } else if (route.name === 'ListadoMascotas') {
              iconName = 'paw';
            } else if (route.name === 'HistorialVacunas') {
              iconName = 'medkit';
            } else if (route.name === 'Citas') {
              iconName = 'calendar';
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
          options={{ title: 'Hacer Cita' }}
        />
        <Tabs.Screen
          name="Detalles"
          component={PantallaDetalles}
          options={{ title: 'Detalles' }}
        />
        <Tabs.Screen
          name="ListadoMascotas"
          component={PantallaListadoMascotas}
          options={{ title: 'Mascotas' }}
        />
        <Tabs.Screen
          name="HistorialVacunas"
          component={PantallaHistorialVacunas}
          options={{ title: 'Historial Vacunas' }}
        />
        <Tabs.Screen
          name="Citas"
          component={Citas}
          options={{ title: 'Citas' }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
>>>>>>> Stashed changes

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PantallaRegistro({ navigation }: any) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Pantalla de Registro</Text>
      <Button title="Volver a Iniciar Sesión" onPress={() => navigation.navigate('InicioSesion')} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

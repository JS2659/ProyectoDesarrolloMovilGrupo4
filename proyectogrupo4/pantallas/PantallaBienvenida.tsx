import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PantallaBienvenida() {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>¡Bienvenido a la Veterinaria!</Text>
      <Text style={estilos.subtitulo}>Estamos aquí para cuidar a tus mascotas.</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
  },
});

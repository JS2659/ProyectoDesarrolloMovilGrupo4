import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function PantallaInicioSesion({ navigation }: { navigation: any }) {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Inicio de Sesión</Text>
      <TextInput style={estilos.entradaTexto} placeholder="Usuario" />
      <TextInput style={estilos.entradaTexto} placeholder="Contraseña" secureTextEntry />
      <Button
        title="Iniciar Sesión"
        onPress={() => navigation.navigate('Bienvenida')}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  entradaTexto: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

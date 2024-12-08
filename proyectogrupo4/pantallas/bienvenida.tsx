import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PantallaBienvenida = ({ route }: any) => {
  const { usuario } = route.params;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Bienvenido</Text>
      <Text style={styles.texto}>Nombre: {usuario.nombre}</Text>
      <Text style={styles.texto}>Correo: {usuario.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PantallaBienvenida;

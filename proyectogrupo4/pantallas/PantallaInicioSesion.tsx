import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const PantallaLogin = ({ navigation }: any) => {
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");

  const manejarInicioSesion = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: correo,
          password: contrasena,
        }),
      });

      const datos = await respuesta.json();

      if (respuesta.status === 200) {
        Alert.alert("Éxito", "Inicio de sesión exitoso");
        navigation.navigate("Citas", { usuarioId: datos[0]?.id });
      } else {
        Alert.alert("Error", datos.mensaje || "Correo o contraseña incorrectos");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", "Ocurrió un error: " + error.message);
      } else {
        Alert.alert("Error", "Ocurrió un error inesperado");
      }
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />

      <Button title="Iniciar Sesión" onPress={manejarInicioSesion} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default PantallaLogin;

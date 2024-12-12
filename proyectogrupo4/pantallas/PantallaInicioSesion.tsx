import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const PantallaLogin = ({ navigation }: any) => {
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");

  const manejarInicioSesion = async () => {
    if (!correo || !contrasena) {
      Alert.alert("Error", "Por favor, ingrese su correo y contraseña.");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: correo,
          password: contrasena,
        }),
      });

      if (!respuesta.ok) {
        const datosError = await respuesta.json();
        throw new Error(datosError.mensaje || "Correo o contraseña incorrectos");
      }

      const datos = await respuesta.json();
      Alert.alert("Éxito", "Inicio de sesión exitoso");
      navigation.navigate("Citas", { usuarioId: datos[0]?.id });
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
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
        autoCapitalize="none"
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
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});

export default PantallaLogin;

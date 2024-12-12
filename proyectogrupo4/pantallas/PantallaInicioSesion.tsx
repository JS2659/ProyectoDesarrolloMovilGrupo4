import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import api from "../services/api";
import { useContexVet } from "../contexto/ProviderVet";

const PantallaLogin = ({ navigation }: any) => {
  const {usuarioId, setUsuarioId} = useContexVet()
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");

  const manejarInicioSesion = async () => {
    if (!correo || !contrasena) {
      Alert.alert("Error", "Por favor, ingrese su correo y contraseña.");
      return;
    }

    try {

      const credenciales = {
        email: correo,
        password: contrasena,
      }
      await api.get(`/login/${credenciales.email}/${credenciales.password}`).then((response)=>{
        if (response.status === 200) {
          Alert.alert("Éxito", "Inicio de sesión exitoso");
          setUsuarioId(response.data[0]?.id)
          navigation.navigate("Citas");
        } else {
          Alert.alert("Error", response.statusText || "Correo o contraseña incorrectos");
        }
      })
      

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

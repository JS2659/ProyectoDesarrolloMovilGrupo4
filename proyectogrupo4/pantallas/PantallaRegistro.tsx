import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import api from "../services/api";

const PantallaRegistro = ({ navigation }: any) => {
  const [nombreCompleto, setNombreCompleto] = useState("")
  const [DNI, setDNI] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [telefono, setTelefono] = useState("")
  const tipo = "cliente"  


  const registrarUsuario = async () => {
    try {
      const nuevoUsuario = {        
          nombreCompleto: nombreCompleto,
          Tipo: tipo,
          nroIdentidad: DNI,
          nroTelefono: telefono,
          email: email,
          password: password        
      }
      await api.post('/usuario', nuevoUsuario).then((response)=>{
        Alert.alert("Éxito", "Regitrado Con Exito");
        //@ts-ignore
        navigation.navigate("Citas", { usuarioId: response.data[0].id });
      }).catch((error)=>{
        Alert.alert("Error", error || "Ocurrió un error al registrar");
      })    

    } catch (error) {
      Alert.alert("Error", "Ocurrió un error: " + error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nombreCompleto}
        onChangeText={(valor) => setNombreCompleto(valor)}
      />
      <TextInput
        style={styles.input}
        placeholder="DNI"
        value={DNI}
        onChangeText={(valor) => setDNI(valor)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        value={telefono}
        onChangeText={(valor) => setTelefono(valor)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(valor) => setEmail(valor)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={(valor) => setPassword(valor)}
        secureTextEntry = {true}
      />

      <Button title="Registrar" onPress={registrarUsuario} />
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

export default PantallaRegistro;

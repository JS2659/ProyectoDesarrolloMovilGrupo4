import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const PantallaRegistro = ({ navigation }: any) => {
  const [formulario, setFormulario] = useState({
    fecha: "",
    usuarioId: "",
    mascotaId: "",
    motivo: "",
    estado: false,
  });

  const handleInputChange = (nombre: string, valor: string) => {
    setFormulario({ ...formulario, [nombre]: valor });
  };


  const registrarConsulta = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/consultas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });

      const datos = await respuesta.json();

      if (respuesta.status === 201) {
        Alert.alert("Éxito", datos.mensaje);
        navigation.navigate("Citas", { usuarioId: formulario.usuarioId });
      } else {
        Alert.alert("Error", datos.error || "Ocurrió un error al registrar");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error: " + error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Programar Consulta</Text>

      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={formulario.fecha}
        onChangeText={(valor) => handleInputChange("fecha", valor)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID del Usuario"
        keyboardType="numeric"
        value={formulario.usuarioId}
        onChangeText={(valor) => handleInputChange("usuarioId", valor)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID de la Mascota (opcional)"
        keyboardType="numeric"
        value={formulario.mascotaId}
        onChangeText={(valor) => handleInputChange("mascotaId", valor)}
      />
      <TextInput
        style={styles.input}
        placeholder="Motivo de la Consulta"
        value={formulario.motivo}
        onChangeText={(valor) => handleInputChange("motivo", valor)}
      />

      <Button title="Registrar" onPress={registrarConsulta} />
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

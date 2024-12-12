import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const PantallaHistorialVacunas = ({ navegación }: any) => {
  const [formulario, setFormulario] = useState({
    mascotaId: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const handleInputChange = (nombre: string, valor: string) => {
    setFormulario({ ...formulario, [nombre]: valor });
  };

  const obtenerHistorialVacunas = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3000/vacunas/historial/${formulario.mascotaId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const datos = await respuesta.json();

      if (respuesta.status === 200) {
        Alert.alert("Éxito", "Historial de vacunas obtenido con éxito");
        navegación.navigate("HistorialVacunas", { datos });
      } else {
        Alert.alert("Error", datos.error || "Ocurrió un error al obtener el historial de vacunas");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error: " + error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Historial de Vacunas</Text>

      <TextInput
        style={styles.input}
        placeholder="ID de la mascota"
        keyboardType="numeric"
        value={formulario.mascotaId}
        onChangeText={(valor) => handleInputChange("mascotaId", valor)}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha de inicio (AAAA-MM-DD)"
        value={formulario.fechaInicio}
        onChangeText={(valor) => handleInputChange("fechaInicio", valor)}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha de fin (AAAA-MM-DD)"
        value={formulario.fechaFin}
        onChangeText={(valor) => handleInputChange("fechaFin", valor)}
      />

      <Button title="Obtener Historial" onPress={obtenerHistorialVacunas} />
    </View>
  );
};

const styles= StyleSheet.create({
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

export default PantallaHistorialVacunas;
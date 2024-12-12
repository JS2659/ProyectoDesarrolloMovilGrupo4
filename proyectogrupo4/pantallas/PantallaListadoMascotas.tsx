import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";

interface Mascota {
 
  id: number;
  nombre: string;
  descripcion: string;
  
}

const PantallaListadoMascotas = ({ navegación }: any) => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  const obtenerMascotas = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/mascotas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const datos: Mascota[] = await respuesta.json(); 

      if (respuesta.status === 200) {
        setMascotas(datos);
      } else {
        Alert.alert("Error", datos.error || "Ocurrió un error al obtener las mascotas");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error: " + error);
    }
  };

  useEffect(() => {
    obtenerMascotas();
  }, []);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Listado de Mascotas</Text>

      <FlatList
        data={mascotas}
        renderItem={({ item }: { item: Mascota }) => (
          <View style={styles.item}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descripcion: {
    fontSize: 16,
  },
});

export default PantallaListadoMascotas;
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';

interface Mascota {
  error: string;
  nombre: string;
  descripcion: string;
  edad: number;
  raza: string;
}

const PantallaDetalles: React.FC<{ navegación: any; ruta: any }> = ({ navegación, ruta }) => {
  const [mascota, setMascota] = useState<Mascota | null>(null);

  const obtenerMascota = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3000/mascotas/${ruta.params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const datos: Mascota = await respuesta.json();

      if (respuesta.status === 200) {
        setMascota(datos);
      } else {
        Alert.alert('Error', datos.error || 'Ocurrió un error al obtener la mascota');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error: ' + error);
    }
  };

  useEffect(() => {
    obtenerMascota();
  }, []);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Detalles de la Mascota</Text>

      {mascota ? (
        <>
          <Text style={styles.nombre}>{mascota.nombre}</Text>
          <Text style={styles.descripcion}>{mascota.descripcion}</Text>
          <Text style={styles.edad}>{mascota.edad} años</Text>
          <Text style={styles.raza}>{mascota.raza}</Text>
        </>
      ) : (
        <Text>Cargando...</Text>
      )}
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
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descripcion: {
    fontSize: 16,
  },
  edad: {
    fontSize: 16,
  },
  raza: {
    fontSize: 16,
  },
});

export default PantallaDetalles;
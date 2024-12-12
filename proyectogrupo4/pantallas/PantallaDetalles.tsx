import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useContexVet } from '../contexto/ProviderVet';
import api from '../services/api';

interface Mascota {
  error: string;
  nombre: string;
  especie: string;
  edad: number;
  peso: string;
}

const PantallaDetalles: React.FC<{ navegación: any; ruta: any }> = ({ navegación, ruta }) => {
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const {mascotaId} = useContexVet()
  const obtenerMascota = async () => {
    try {
      await api.get(`/mascotas/${mascotaId}`).then((response)=>{
        const datos: Mascota = response.data[0]
        setMascota(datos);
      }).catch((error)=>{
        Alert.alert('Error', error || 'Ocurrió un error al obtener la mascota');
      })
     
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
          <Text style={styles.nombre}>Nombre de mi mascota: {mascota.nombre}</Text>
          <Text style={styles.descripcion}>Mi mascota es un: {mascota.especie}</Text>
          <Text style={styles.edad}>Tiene: {mascota.edad} años de edad</Text>
          <Text style={styles.raza}>Pesa: {mascota.peso} Kg</Text>
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
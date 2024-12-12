import { View, Text, StyleSheet, Alert, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../services/api';
import { useContexVet } from '../contexto/ProviderVet';

interface Mascota {
 
  id: number;
  nombre: string;
  descripcion: string;
}

export default function PantallaListadoMascotas({ navigation }: any) {
  const {usuarioId, setMascotaId} = useContexVet()
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  const verMascota = (mascotaId:number) =>{
    setMascotaId(mascotaId)
    navigation.navigate('Detalles')
  }
 
  const obtenerMascotas = async () => {
 
    try {
      await api.get(`/mascotasporusuario/${usuarioId}`).then((response)=>{
        const datos: Mascota[] = response.data;
        setMascotas(datos); 
      }).catch((error)=>{
        Alert.alert("Error", error || "Ocurrió un error al obtener las mascotas");
      })
     
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
            <Button title='Ver Detalles' onPress={()=>verMascota(item.id)}></Button>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}




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

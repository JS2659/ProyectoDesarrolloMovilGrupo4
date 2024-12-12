import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import { useContexVet } from '../contexto/ProviderVet';
import api from '../services/api';
import { useFocusEffect } from '@react-navigation/native';


interface Consulta {
  id: number;
  fecha: string;
  motivo: string;
  estado: boolean;
  usuarioId: number;
}
export default function Citas({ navigation }: any) {

  
  const { usuarioId } = useContexVet();

  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await api.get(`/consultas/${usuarioId}`);
        setConsultas(response.data); 
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudieron cargar las consultas.');
      }
    };

    fetchConsultas();
  }, []);

  const actualizarConsulta = async (idConsulta: number) => {
    try {
      const response = await api.put(`/consultas/${idConsulta}`, {
        estado: true,
      });
      Alert.alert('Éxito', response.data.mensaje);
      setConsultas((prev) =>
        prev.map((consulta) =>
          consulta.id === idConsulta ? { ...consulta, estado: true } : consulta
        )
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar la consulta.');
    }
  };

  const renderConsulta = ({ item }: { item: Consulta }) => (
    <View style={styles.card}>
      <Text style={styles.texto}>Fecha: {item.fecha}</Text>
      <Text style={styles.texto}>Motivo: {item.motivo}</Text>
      <Text style={styles.texto}>Estado: {item.estado ? 'Atendida' : 'Pendiente'}</Text>
      {!item.estado && (
        <Button title="Marcar como atendida" onPress={() => actualizarConsulta(item.id)} />
      )}
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Consultas Pendientes</Text>
      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderConsulta}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  texto: {
    fontSize: 16,
  },
});
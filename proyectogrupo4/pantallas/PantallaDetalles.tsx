import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';
import { Pet} from '../types/Pet';

const PantallaDetalles = () => {
  const route = useRoute();
  const { petId } = route.params; 
  const [pet, setPet] = useState<Pet| null>(null);

  const fetchPantallaDetalles = async () => {
    try {
      const response = await api.get(`/Mascota/${petId}`);
      setPet(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPantallaDetalles();
  }, []);

  if (!pet) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View>
      <Text>Nombre: {pet.name}</Text>
      <Text>Tipo: {pet.type}</Text>
      <Text>Propietario: {pet.owner}</Text>
      <Text>Historial de Vacunación:</Text>
      {pet.vaccinationHistory.map((vaccine, index) => (
        <Text key={index}>{vaccine.date} - {vaccine.vaccine}</Text>
      ))}
      <Button title="Agendar Consulta" onPress={() => {}} />
    </View>
  );
};


export default PantallaDetalles;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';
import { Vaccination } from '../types/Pet';

const PantallaHistorialVacunas = () => {
  const route = useRoute();
  const { petId } = route.params; 
  const [HistorialVacunas, setHistorialVacunas] = useState<Vaccination[]>([]);

  const fetchHistorialVacunas = async () => {
    try {
      const response = await api.get(`/pets/${petId}/vaccinations`);
      setHistorialVacunas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistorialVacunas();
  }, []);

  return (
    <View>
      <Text>Historial de Vacunación</Text>
      <FlatList
        data={HistorialVacunas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.date} - {item.vaccine}</Text>
          </View>
        )}
      />
    </View>
  );
};


export default PantallaHistorialVacunas;
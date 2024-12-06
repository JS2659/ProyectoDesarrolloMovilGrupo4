import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import api from '../services/api';
import { Pet } from '../types/Pet';

const PantallaListadoMascotas = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  const fetchPets = async () => {
    try {
      const response = await api.get('/pets');
      setPets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <View>
      <Text>Listado de Mascotas</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - {item.type}</Text>
            <Button title="Ver Detalles" onPress={() => {}} />
          </View>
        )}
      />
    </View>
  );
};


export default PantallaListadoMascotas;
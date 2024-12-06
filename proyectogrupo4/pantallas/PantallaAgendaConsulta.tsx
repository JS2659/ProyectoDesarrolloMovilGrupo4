import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import api from '../services/api';

const PantallaAgendaConsulta= () => {
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');

  const handleSchedule = async () => {
    try {
      const response = await api.post('/Consulta', {
        ownerName,
        petName,
        animalType,
        phone,
        reason,
      });
      console.log(response.data);
   
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Agendar Consulta</Text>
      <TextInput
        placeholder="Nombre Completo del Propietario"
        value={ownerName}
        onChangeText={setOwnerName}
      />
      <TextInput
        placeholder="Nombre de la Mascota"
        value={petName}
        onChangeText={setPetName}
      />
      <TextInput
        placeholder="Tipo de Animal"
        value={animalType}
        onChangeText={setAnimalType}
      />
      <TextInput
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="Motivo"
        value={reason}
        onChangeText={setReason}
      />
      <Button title="Agendar" onPress={handleSchedule} />
    </View>
  );
};

export default PantallaAgendaConsulta;
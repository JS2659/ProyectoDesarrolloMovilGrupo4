import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';

export default function Citas({ route }: any) {
  const { idUsuario } = route.params;

  const [fecha, setFecha] = useState('');
  const [mascotaId, setMascotaId] = useState('');
  const [motivo, setMotivo] = useState('');
  const [estado, setEstado] = useState(true); // Valor por defecto para 'estado' es true

  const enviarConsulta = async () => {
    if (!fecha || !mascotaId || !motivo) {
      Alert.alert('Error', 'Por favor, ingrese todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioId: idUsuario,  // Tomado desde los parámetros
          fecha: fecha,
          mascotaId: mascotaId,
          motivo: motivo,
          estado: estado,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();

      Alert.alert('Éxito', 'Consulta registrada correctamente.');
      // Limpiar los campos después de enviar
      setFecha('');
      setMascotaId('');
      setMotivo('');
      setEstado(true);  // Restaurar el valor por defecto
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar la consulta.');
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Nueva Consulta</Text>

      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD HH:mm:ss)"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="ID de Mascota"
        value={mascotaId}
        onChangeText={setMascotaId}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Motivo"
        value={motivo}
        onChangeText={setMotivo}
      />
      
      {/* El campo de Estado puede ser un checkbox o un switch */}
      <View style={styles.estadoContainer}>
        <Text>Estado: {estado ? 'Atendida' : 'Pendiente'}</Text>
        <Button title={`Marcar como ${estado ? 'Pendiente' : 'Atendida'}`} onPress={() => setEstado(!estado)} />
      </View>

      <Button title="Registrar Consulta" onPress={enviarConsulta} />
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
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  estadoContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
});

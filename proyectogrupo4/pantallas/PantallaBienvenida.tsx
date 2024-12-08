import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';

export default function PantallaBienvenida() {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>¡Bienvenido a Veterinaria Amigos Peludos!</Text>
      <Text style={estilos.subtitulo}>
        Estamos aquí para cuidar a tus mascotas y asegurar su bienestar.
      </Text>
      
      <View style={estilos.infoContenedor}>
        <Text style={estilos.descripcion}>
          En Veterinaria Amigos Peludos, nos preocupamos por cada uno de nuestros pacientes de cuatro patas. 
          Ofrecemos servicios de consultas generales, cirugías, vacunación y mucho más. 
        </Text>
      </View>

      <View style={estilos.redesContenedor}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/veterinariaamigospeludos')}>
          <Image
            style={estilos.icono}
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/veterinariaamigospeludos')}>
          <Image
            style={estilos.icono}
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg' }}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/1234567890')}>
          <Image
            style={estilos.icono}
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={estilos.boton}
        onPress={() => Linking.openURL('https://animalhealth.hn/')}
      >
        <Text style={estilos.botonTexto}>Visita Nuestro Sitio Web</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2a9d8f',
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6a0572',
    marginBottom: 20,
  },
  infoContenedor: {
    marginBottom: 20,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  redesContenedor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginBottom: 20,
  },
  icono: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  boton: {
    backgroundColor: '#2a9d8f',
    padding: 12,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

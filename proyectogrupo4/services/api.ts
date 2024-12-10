import axios from 'axios';

const api = axios.create({
  baseURL: 'http://tu-backend-api.com/api', // Cambia esto por la URL de tu backend
});

export default api;
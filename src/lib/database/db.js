const mongoose = require('mongoose');

let isConnected = false;

// Función para conectar a la base de datos
const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL || '');
    isConnected = true;

    console.log('---> Conectado a MongoDB');
  } catch (error) {
    console.log('Error al conectar a MongoDB');
    console.log(error);
  }
};

// Función para desconectar a la base de datos
const disconnectToDB = async () => {
  // Si estamos en desarrollo no nos desconectamos de la bd
  if (process.env.NODE_ENV === 'DEV') return;

  if (!isConnected) return;

  try {
    await mongoose.disconnect();
    isConnected = false;

    console.log('---> Desconectado de MongoDB');
  } catch (error) {
    console.log('Error al desconectar a MongoDB: ', error);
  }
};

module.exports = {
  connectToDB,
  disconnectToDB,
};

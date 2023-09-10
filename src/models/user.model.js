const mongoose = require('mongoose');

// Definir el esquema de usuario
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['RECEPCION', 'SUPERVISOR'],
      default: 'RECEPCION', // Valor predeterminado si no se especifica el rol
    },
  },
  {
    timestamps: true,
  }
);

// Crear el modelo de usuario
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;

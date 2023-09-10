const mongoose = require('mongoose');

// Definir el esquema de visitante (guest)
const GuestSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    identificationCard: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfEntry: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    status: {
      type: String,
      enum: ['EN CURSO', 'FINALIZADO'],
      default: 'EN CURSO',
    },
    note: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Crear el modelo de visitante (guest)
const Guest = mongoose.models.Guest || mongoose.model('Guest', GuestSchema);

module.exports = Guest;

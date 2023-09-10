const mongoose = require('mongoose');

// Definir el esquema de departamento
const DepartmentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['ADMINISTRACION', 'PROVEEDORES', 'SERVICIO AL CLIENTE', 'VENTAS'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Crear el modelo de departamento
const Department =
  mongoose.models.Department || mongoose.model('Department', DepartmentSchema);

module.exports = Department;

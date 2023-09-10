const mongoose = require('mongoose');

const Department = require('../models/department.model');
const { connectToDB, disconnectToDB } = require('../lib/database/db');

// Función del servicio para obtener todos los departamentos
const getAllDepartments = async () => {
  await connectToDB();

  try {
    const departments = await Department.find();

    return departments;
  } catch (error) {
    throw new Error('Error al obtener los departamentos');
  } finally {
    await disconnectToDB();
  }
};

const getDepartment = async (id) => {
  await connectToDB();

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Formato de Id no válido');
    }

    const department = await Department.findById(id);

    if (!department) {
      throw new Error('Departamento no encontrado');
    }

    return department;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await disconnectToDB();
  }
};

module.exports = { getAllDepartments, getDepartment };

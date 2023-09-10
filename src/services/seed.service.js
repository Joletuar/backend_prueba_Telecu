const { connectToDB, disconnectToDB } = require('../lib/database/db');

const seed = require('../lib/seed');

const Department = require('../models/department.model');
const Guest = require('../models/guest.model');

const loadDepartmentsSeedToDB = async () => {
  await connectToDB();

  try {
    // cargamos los valores iniciales de los departamentos
    await Department.deleteMany();
    await Department.insertMany(seed.departments);
  } catch (error) {
    console.log(error);

    throw new Error('Error al cargar el seed de datos de departamentos');
  } finally {
    await disconnectToDB();
  }
};

const loadGuestsSeedToDB = async () => {
  await connectToDB();

  try {
    const allDepartmentIds = await Department.find().select('_id');

    const departmentIds = allDepartmentIds.map((department) => department._id);

    // mapeamos los nuevos ids

    const guestsWithRandomDepartments = seed.guests.map((guest) => ({
      ...guest,
      department:
        departmentIds[Math.floor(Math.random() * departmentIds.length)],
    }));

    // cargamos un conjunto de datos de visitantes para realizar el pagineo
    await Guest.deleteMany();
    await Guest.insertMany(guestsWithRandomDepartments);
  } catch (error) {
    console.log(error);

    throw new Error('Error al cargar el seed de datos de visitantes');
  } finally {
    await disconnectToDB();
  }
};

module.exports = { loadDepartmentsSeedToDB, loadGuestsSeedToDB };

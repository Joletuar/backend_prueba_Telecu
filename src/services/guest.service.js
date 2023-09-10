const mongoose = require('mongoose');

const Guest = require('../models/guest.model');
const Department = require('../models/department.model');

const { connectToDB, disconnectToDB } = require('../lib/database/db');

const { getDepartment } = require('./department.service');

const getGuests = async ({ page, pageSize }) => {
  await connectToDB();

  try {
    //inicio
    const start = (Number(page) - 1) * Number(pageSize);

    const guests = await Guest.find()
      .populate({
        path: 'department',
        model: Department,
        select: ['_id', 'type'],
      })
      .sort({ createdAt: 'desc' })
      .skip(start)
      .limit(Number(pageSize));

    // total de documentos
    const totalGuests = await Guest.countDocuments();

    await disconnectToDB();

    //  número total de páginas
    const totalPages = Math.ceil(totalGuests / pageSize);

    // verificar si hay siguiente página
    const hasNextPage = page < totalPages;

    return {
      guests,
      totalPages,
      hasNextPage,
    };
  } catch (error) {
    console.log(error);

    throw new Error('Error al obtener los visitantes');
  }
};

const addGuest = async ({
  date,
  time,
  name,
  identificationCard,
  dateOfEntry,
  reason,
  department,
  status,
  note,
}) => {
  await connectToDB();

  try {
    // validamos que el departamento exista y sea válido
    const departmentExists = await getDepartment(department);

    if (!departmentExists) {
      throw new Error('Departamento no encontrado');
    }

    const guestExists = await Guest.findOne({ identificationCard });

    if (guestExists) {
      throw new Error('Visitante ya existe con esa cédula');
    }

    const newGuest = new Guest({
      date,
      time,
      name,
      identificationCard,
      dateOfEntry,
      reason,
      department,
      status,
      note,
    });

    const savedGuest = await newGuest.save();

    const populatedGuest = await savedGuest.populate({
      path: 'department',
      model: Department,
      select: ['_id', 'type'],
    });

    await disconnectToDB();

    return populatedGuest;
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  }
};

const getGuest = async (id) => {
  await connectToDB();

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Formato de Id no válido');
    }

    const guest = await Guest.findById(id).populate({
      path: 'department',
      model: Department,
      select: ['_id', 'type'],
    });

    await disconnectToDB();

    if (!guest) {
      throw new Error('Visitante no encontrado');
    }

    return guest;
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  }
};

const updateGuest = async ({ id, note, status }) => {
  await connectToDB();

  try {
    const updatedGuest = await Guest.findByIdAndUpdate(
      id,
      {
        note,
        status,
      },
      {
        new: true,
      }
    );

    await disconnectToDB();

    if (!updatedGuest) {
      throw new Error('Invitado no encontrado');
    }

    return updatedGuest;
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  }
};

module.exports = {
  getGuests,
  addGuest,
  getGuest,
  updateGuest,
};

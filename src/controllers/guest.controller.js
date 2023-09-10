const { response } = require('express');

const {
  getGuests,
  addGuest,
  getGuest,
  updateGuest,
} = require('../services/guest.service');

const {
  GuestSchemaValidator,
  GuestUpdateSchemaValidator,
} = require('../lib/validations/guest.validation');

const getItems = async (req, res = response) => {
  try {
    // obtenemos el numero de página a devolver
    const { page = '1', size = '5' } = req.query;

    const { guests, totalPages, hasNextPage } = await getGuests({
      page,
      pageSize: size,
    });

    const mappedGuests = guests.map((guest) => ({
      _id: guest._id,
      date: guest.date,
      time: guest.time,
      name: guest.name,
      identificationCard: guest.identificationCard,
      dateOfEntry: guest.dateOfEntry,
      reason: guest.reason,
      department: guest.department,
      status: guest.status,
      note: guest.note,
    }));

    return res.status(200).json({
      guests: mappedGuests,
      meta: {
        totalPages,
        page: +page,
        hasNextPage,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createItem = async (req, res = response) => {
  try {
    const {
      date,
      time,
      name,
      identificationCard,
      dateOfEntry,
      reason,
      department,
      status,
      note,
    } = GuestSchemaValidator.parse(req.body);

    await addGuest({
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

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);

    const errorMessage =
      error.name === 'ZodError' ? 'Datos no válidos' : error.message;

    return res.status(400).json({ error: errorMessage });
  }
};

const getItem = async (req, res = response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error('Id no válido');
    }

    const guest = await getGuest(id);

    return res.status(200).json({
      guest: {
        _id: guest._id,
        date: guest.date,
        time: guest.time,
        name: guest.name,
        identificationCard: guest.identificationCard,
        dateOfEntry: guest.dateOfEntry,
        reason: guest.reason,
        department: guest.department,
        note: guest.note,
        status: guest.status,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateItem = async (req, res = response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error('Id no válido');
    }

    const { note, status } = GuestUpdateSchemaValidator.parse(req.body);

    await updateGuest({ id, note, status });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);

    const errorMessage =
      error.name === 'ZodError' ? 'Datos no válidos' : error.message;

    return res.status(400).json({ error: errorMessage });
  }
};

module.exports = { getItems, createItem, getItem, updateItem };

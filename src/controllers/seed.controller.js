const { response } = require('express');

const {
  loadDepartmentsSeedToDB,
  loadGuestsSeedToDB,
} = require('../services/seed.service');

const loadItems_1 = async (req, res = response) => {
  try {
    await loadDepartmentsSeedToDB();

    return res.status(200).json({
      msg: 'Datos cargados correctamente',
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loadItems_2 = async (req, res = response) => {
  try {
    await loadGuestsSeedToDB();

    return res.status(200).json({
      msg: 'Datos cargados correctamente',
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loadItems_1,
  loadItems_2,
};

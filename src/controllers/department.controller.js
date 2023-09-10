const { response } = require('express');

const { getAllDepartments } = require('../services/department.service');

const getItems = async (req, res = response) => {
  try {
    const departments = await getAllDepartments();

    const mappedDepartments = departments.map((department) => ({
      _id: department._id,
      type: department.type,
    }));

    return res.status(200).json({
      departments: mappedDepartments,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getItems };

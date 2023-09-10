const { response } = require('express');

const {
  UserSchemaValidator,
  LoginSchemaValidator,
} = require('../lib/validations/user.validation');

const { registerUser, loginUser } = require('../services/auth.service');

const registerItem = async (req, res = response) => {
  try {
    // validamos los datos del body
    const { name, password, email, role } = UserSchemaValidator.parse(req.body);

    // si es válido llamamos al servicio
    const { user, token } = await registerUser({ email, name, password, role });

    return res.status(200).json({
      user: {
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);

    const errorMessage =
      error.name === 'ZodError' ? 'Datos no válidos' : error.message;

    return res.status(400).json({ error: errorMessage });
  }
};

const loginItem = async (req, res = response) => {
  try {
    // validamos los datos del body
    const { email, password } = LoginSchemaValidator.parse(req.body);

    // si es válido llamamos al servicio
    const { user, token } = await loginUser({ email, password });

    return res.status(200).json({
      user: {
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);

    const errorMessage =
      error.name === 'ZodError' ? 'Datos no válidos' : error.message;

    return res.status(400).json({ error: errorMessage });
  }
};

module.exports = { registerItem, loginItem };

const { response } = require('express');

const { isValidToken } = require('../jwt');

// Middleware de autenticación
const authenticateToken = async (req, res = response, next) => {
  try {
    // obtenemos el token de los headers
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('No tiene sesión activa');
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new Error('Formato de token no válido');
    }

    // validamos el token
    const session = await isValidToken(token);

    if (!session) {
      throw new Error('Sesión no válida');
    }

    // incluimos la sesión en la request para el controller
    req.session = session;

    next();
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error: error.message });
  }
};

module.exports = { authenticateToken };

const jwt = require('jsonwebtoken');

// Función encargada de firmar/generar los tokens
const signToken = ({ _id, name, role, email }) => {
  const seed = process.env.JWT_SEED;

  if (!seed) {
    throw new Error(
      'No hay semilla para generar el token, revisar variables de entorno'
    );
  }

  // generamos el jwt
  try {
    return jwt.sign(
      {
        _id,
        name,
        role,
        email,
      },
      seed,
      {
        expiresIn: '30d',
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error('No se pudo firmar el token');
  }
};

// Función de validación de JWT
const isValidToken = (token) => {
  const seed = process.env.JWT_SEED;

  if (!seed) {
    throw new Error(
      'No hay semilla para generar el token, revisar variables de entorno'
    );
  }

  return new Promise((resolve, reject) => {
    try {
      
      jwt.verify(token, seed, (err, payload) => {
        if (err) {
          reject('Token no válido');
        }

        // Obtenemos los datos
        const { _id, name, role, email } = payload;

        resolve({ _id, name, role, email });
      });
    } catch (error) {
      reject('Error al validar el token');
    }
  });
};

module.exports = {
  signToken,
  isValidToken,
};

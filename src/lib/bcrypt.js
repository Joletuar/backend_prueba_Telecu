const bcrypt = require('bcrypt');

// Función para hashear una contraseña
const hashPassword = async (password) => {
  try {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new Error('Error al hashear la contraseña');
  }
};

// Función para comparar una contraseña con su versión hasheada
const comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);

    return match;
  } catch (error) {
    throw new Error('Error al comparar las contraseñas');
  }
};

module.exports = { hashPassword, comparePasswords };

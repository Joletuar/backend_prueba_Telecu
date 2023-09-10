const { hashPassword, comparePasswords } = require('../lib/bcrypt');
const { connectToDB, disconnectToDB } = require('../lib/database/db');
const jwt = require('../lib/jwt');

const User = require('../models/user.model');

// Función para registrar un usuario
const registerUser = async ({ name, email, password, role }) => {
  await connectToDB();

  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    // generamos el token
    const token = jwt.signToken({
      email: savedUser.email,
      name: savedUser.name,
      role: savedUser.role,
    });

    return { user: savedUser, token };
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  } finally {
    await disconnectToDB();
  }
};

// Función para el inicio de sesión
const loginUser = async ({ email, password }) => {
  await connectToDB();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta');
    }

    // generamos el token
    const token = jwt.signToken({
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return { user, token };
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  } finally {
    await disconnectToDB();
  }
};

module.exports = { registerUser, loginUser };

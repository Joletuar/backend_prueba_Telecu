const validateRole = async (req, res, next) => {
  try {
    const { role } = req.session;

    if (role !== 'RECEPCION') {
      throw new Error('No tiene permisos para realizar esta acción');
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error: error.message });
  }
};

module.exports = validateRole;

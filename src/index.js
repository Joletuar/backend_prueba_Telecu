const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

require('dotenv').config();

const PORT = process.env.PORT ?? 4000;

const app = express();

// middlewares globales

app.use(
  cors({
    origin: process.env.FRONT_URL || '*',
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length]')
);

// rutas

app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/department', require('./routes/deparment.route'));
app.use('/api/v1/guest', require('./routes/guest.route'));
app.use('/api/v1/seed', require('./routes/seed.route'));

app.listen(PORT, () => {
  console.log(`----> Servidor levando en el puerto ${PORT}`);
});

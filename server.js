const express = require('express');
const sequelize = require('./config/database');
const blagueRoutes = require('./routes/blagues');
const Joke = require('./models/joke');
const defaultJokes = require('./config/defaultJokes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
const API_PREFIX = '/api/v1';

app.use(express.json());
app.use(`${API_PREFIX}/blagues`, blagueRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Handle unknown routes
app.use((_, __, next) => {
  const err = new Error('Resource not found');
  err.status = 404;
  next(err);
});

// Basic error handler
app.use((err, _, res, __) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;

(async function start() {
  try {
    await sequelize.sync();
    const count = await Joke.count();
    if (count === 0) {
      await Joke.bulkCreate(defaultJokes, { validate: true });
    }
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to launch server', error);
    process.exit(1);
  }
})();

module.exports = app;

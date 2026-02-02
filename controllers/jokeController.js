const Joke = require('../models/joke');

exports.list = async (_, res, next) => {
  try {
    const jokes = await Joke.findAll({ order: [['createdAt', 'DESC']] });
    res.json(jokes);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const joke = await Joke.findByPk(req.params.id);
    if (!joke) {
      const err = new Error('Joke not found');
      err.status = 404;
      throw err;
    }
    res.json(joke);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    const err = new Error('Question and answer are required');
    err.status = 400;
    return next(err);
  }

  try {
    const joke = await Joke.create({ question, answer });
    res.status(201).json(joke);
  } catch (error) {
    next(error);
  }
};

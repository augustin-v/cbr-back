const { literal } = require('sequelize');
const Joke = require('../models/joke');

const buildValidationError = () => {
  const err = new Error('Question et réponse sont obligatoires');
  err.status = 400;
  return err;
};

exports.list = async (_, res, next) => {
  try {
    const blagues = await Joke.findAll({ order: [['createdAt', 'DESC']] });
    res.json(blagues);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const blague = await Joke.findByPk(req.params.id);
    if (!blague) {
      const err = new Error('Blague introuvable');
      err.status = 404;
      throw err;
    }
    res.json(blague);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return next(buildValidationError());
  }

  try {
    const blague = await Joke.create({ question, answer });
    res.status(201).json(blague);
  } catch (error) {
    next(error);
  }
};

exports.random = async (_, res, next) => {
  try {
    const blague = await Joke.findOne({
      order: [literal('RANDOM()')],
    });
    if (!blague) {
      const err = new Error('Aucune blague disponible');
      err.status = 404;
      throw err;
    }
    res.json(blague);
  } catch (error) {
    next(error);
  }
};

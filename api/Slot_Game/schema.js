const Joi = require("joi");

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

const spinSchema = {
  body: Joi.object().keys({
    playerId: Joi.string().hex().length(24).required(),
    symbols: Joi.array().items(Joi.string().required()).min(3).max(3),
    outcome: Joi.string(),
    betAmount: Joi.number().positive(),
    winnings: Joi.number().min(0),
    date: Joi.date().default(Date.now),
  }),
};

module.exports = { spinSchema };

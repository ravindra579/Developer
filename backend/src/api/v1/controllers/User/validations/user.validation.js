const Joi = require('joi');
const { objectId } = require('../../../validations/custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    dob: Joi.date(),
    age: Joi.number(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    gender: Joi.string(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};


module.exports = {
  createUser,
  getUsers,
};

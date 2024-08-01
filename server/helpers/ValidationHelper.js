const Joi = require('joi');
const Boom = require('boom');

const userValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    nama: Joi.string().required(),
    password:Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}

const courseValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}
module.exports = { userValidation, loginValidation,courseValidation };

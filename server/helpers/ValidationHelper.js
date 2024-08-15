const Joi = require('joi');
const Boom = require('boom');

const userValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password:Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}
const userValidationSignInGoole = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    register_type:Joi.string().required(),
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

const coursesValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    instructorId: Joi.number().required(),
    price: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}

const lessonValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    content: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}

const purchaseValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    courseId: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}

const paymentValidation = (data) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    paymentMethod: Joi.string().required(),
    purchaseId: Joi.number().required(),
    paymentStatus: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}
module.exports = { userValidation, loginValidation, coursesValidation, lessonValidation, purchaseValidation, paymentValidation,userValidationSignInGoole };

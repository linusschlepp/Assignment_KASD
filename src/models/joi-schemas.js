import Joi from "joi";

export const UserSpec = {
  email: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  admin: Joi.boolean().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const PlacemarkSpec = {
  longitude: Joi.number().integer().required(),
  latitude: Joi.number().integer().required(),
  description: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
};

export const CategorySpec = {
  name: Joi.string().required(),
};

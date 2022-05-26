import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    email: Joi.string().example("John").required(),
    firstName: Joi.string().example("Doe").required(),
    lastName: Joi.string().example("john@doe.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const PlacemarkSpec = Joi.object()
  .keys({
    longitude: Joi.number().integer().required().example(50),
    latitude: Joi.number().integer().required().example(12),
    description: Joi.string().required().example("Very nice city"),
    name: Joi.string().required().example("Regensburg"),
    categoryid: IdSpec,
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const CategorySpec = Joi.object()
  .keys({
    name: Joi.string().required().example("cities"),
    userid: IdSpec,
    tracks: PlacemarkArraySpec,
  })
  .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items("CategorySpecPlus").label("CategoryArray");

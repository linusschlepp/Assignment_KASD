import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("john@doe.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("John").required(),
  lastName: Joi.string().example("Doe").required(),
  admin: Joi.boolean().example(false).required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    longitude: Joi.number().required().example(50.135),
    latitude: Joi.number().required().example(12.125),
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
    img: Joi.string().required().example("test"),
    // img1: Joi.object().optional(),
    placemarks: PlacemarkArraySpec,
  })
  .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    //   userId: Joi.string().example("62a30c2ff2f382cc36bdea7c").required(),
  })
  .label("JwtAuth");

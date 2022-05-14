import Mongoose from "mongoose";
import Joi from "joi";

const { Schema } = Mongoose;

const userSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
});

export const User = Mongoose.model("User", userSchema);

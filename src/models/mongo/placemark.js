import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  longitude: Number,
  latitude: Number,
  name: String,
  description: String,
  // duration: Number,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);

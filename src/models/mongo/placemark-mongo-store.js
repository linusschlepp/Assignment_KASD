import { Placemark } from "./placemark.js";
import { Category } from "./category.js";

export const placemarkMongoStore = {
  async getPlacemarksByCategoryId(id) {
    const placemarks = await Placemark.find({ categoryid: id }).lean();
    return placemarks;
  },

  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    placemark.categoryid = categoryId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async deletePlacemarkById(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.longitude = updatedPlacemark.longitude;
    placemark.latitude = updatedPlacemark.latitude;
    placemark.name = updatedPlacemark.name;
    placemark.description = updatedPlacemark.description;
    placemark.duration = updatedPlacemark.duration;
    await placemark.save();
  },

  async updatePlacemark_(updatedPlacemark) {
    const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
    //   placemark.name = updatedPlacemark.name;
    placemark.img = updatedPlacemark.img;
    await placemark.save();
  },
};

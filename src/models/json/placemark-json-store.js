import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/placemarks.json"));
db.data = { placemarks: [] };

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    await db.read();
    placemark._id = v4();
    placemark.categoryId = categoryId;
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarksByCategoryId(id) {
    await db.read();
    return db.data.placemarks.filter((placemark) => placemark.categoryId === id);
  },

  async getPlacemarkById(id) {
    await db.read();
    return db.data.placemarks.find((placemark) => placemark._id === id);
  },

  async deletePlacemarkById(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.longitude = updatedPlacemark.longitude;
    placemark.latitude = updatedPlacemark.latitude;
    placemark.name = updatedPlacemark.name;
    placemark.decription = updatedPlacemark.decription;
    await db.write();
  },
};

import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { placemarkJsonStore } from "./placemark-json-store.js";

const db = new Low(new JSONFile("./src/models/json/categories.json"));
db.data = { categories: [] };

export const categoriesJsonStore = {
  async getAllCategories() {
    await db.read();
    return db.data.categories;
  },

  async addCategory(category) {
    await db.read();
    category._id = v4();
    db.data.categories.push(category);
    await db.write();
    return category;
  },

  async getCategoryById(id) {
    await db.read();
    const list = db.data.categories.find((category) => category._id === id);
    list.placemarks = await placemarkJsonStore.getPlacemarksByCategoryId(list._id);
    return list;
  },

  async getUserCategories(userid) {
    await db.read();
    return db.data.categories.filter((category) => category.userid === userid);
  },

  async deleteCategoryById(id) {
    await db.read();
    const index = db.data.categories.findIndex((playlist) => playlist._id === id);
    db.data.categories.splice(index, 1);
    await db.write();
  },

  async deleteAllCategories() {
    db.data.categories = [];
    await db.write();
  },
};

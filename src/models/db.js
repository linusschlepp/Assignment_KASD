import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { categoriesJsonStore } from "./json/categories-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { categoryMongoStore } from "./mongo/category-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  categoryStore: null,

  init() {
    this.userStore = userMongoStore;
    this.placemarkStore = placemarkMongoStore;
    this.categoryStore = categoryMongoStore;
    connectMongo();
  },
};

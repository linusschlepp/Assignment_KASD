import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { categoriesJsonStore } from "./json/categories-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  categoryStore: null,

  init() {
    this.userStore = userMongoStore;
    this.placemarkStore = placemarkJsonStore;
    this.categoryStore = categoriesJsonStore;
  },
};

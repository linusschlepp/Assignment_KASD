import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Category",
        placemark: category,
      };
      return h.view("category-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: (request, h, error) => h.view("category-view", { title: "Add placemark error", errors: error.details }).takeover().code(400),
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newPlacemark = {
        longitude: Number(request.payload.longitude),
        latitude: Number(request.payload.latitude),
        description: request.payload.description,
        name: request.payload.name,
      };
      await db.placemarkStore.addPlacemark(category._id, newPlacemark);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.placemarkStore.deletePlacemark(request.params.placemarkid);
      return h.redirect(`/category/${category._id}`);
    },
  },
};

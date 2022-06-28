import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PlacemarkArraySpec, PlacemarkSpec, PlacemarkSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

export const placemarkApi = {
  // Get all placemarks
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlacemarkArraySpec, failAction: validationError },
    description: "Get all placemarkApi",
    notes: "Returns all placemarkApi",
  },

  // Finds placemarks corresponding to category id
  findPlacemarksByCategoryId: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks.filter((placemark) => placemark.categoryid === request.params.id);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlacemarkArraySpec, failAction: validationError },
    description: "Get all placemarkApi",
    notes: "Returns all placemarkApi",
  },

  // Finds one specific placemark
  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },
    tags: ["api"],
    description: "Find a Placemark",
    notes: "Returns a Placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  // Update specific placemark
  updateOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.updatePlacemark(request.payload);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a Placemark",
    notes: "One placemarkApi gets updated",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  // Creates specific placemark
  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const newPlacemark = await db.placemarkStore.addPlacemark(request.params.id, request.payload);
        if (newPlacemark) {
          const file = newPlacemark.img;
          if (Object.keys(file).length > 1) {
            const url = await imageStore.uploadImage(newPlacemark.img);
            newPlacemark.img = url;
          } else {
            // If the user didn't add any picture in the frontend, a default picture is added to the placemark
            newPlacemark.img = "https://res.cloudinary.com/dvfwsgoh0/image/upload/v1655461983/mhi6dbjsefhc97b1ewte.png";
          }
          await db.placemarkStore.updatePlacemark(newPlacemark);
          return h.response(newPlacemark).code(201);
        }
        return Boom.badImplementation("error creating Placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns the newly created placemark",
    validate: { payload: PlacemarkSpec },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  // Deletes all placemarks
  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placemarkApi",
  },

  // Deletes one specific placemarks
  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.deletePlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }

        await db.placemarkStore.deletePlacemarkById(request.params.id);
        return h.response().code(204);
      } catch (err) {
        console.log(`der Fehler: ${err}`);
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },
    tags: ["api"],
    description: "Delete a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};

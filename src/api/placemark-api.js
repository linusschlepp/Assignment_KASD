import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PlacemarkArraySpec, PlacemarkSpec, PlacemarkSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

export const placemarkApi = {
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
    // TODO: Documentation requires fixing
    tags: ["api"],
    response: { schema: PlacemarkArraySpec, failAction: validationError },
    description: "Get all placemarkApi",
    notes: "Returns all placemarkApi",
  },

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

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const newPlacemark = await db.placemarkStore.addPlacemark(request.params.id, request.payload);
        if (newPlacemark) {
          // sollte buffered sein
          const file = newPlacemark.img;
          if (Object.keys(file).length > 1) {
            const url = await imageStore.uploadImage(newPlacemark.img);
            newPlacemark.img = url;
          } else {
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
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns the newly created placemark",
    validate: { payload: PlacemarkSpec },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

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

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        console.log("requestparam:" + request.params.id);
        const placemark = await db.placemarkStore.deletePlacemarkById(request.params.id);
        console.log(placemark);
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

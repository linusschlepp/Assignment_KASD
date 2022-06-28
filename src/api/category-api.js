import Boom from "@hapi/boom";
import { CategoryArraySpec, CategorySpec, CategorySpecPlus, IdSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const categoryApi = {
  // Get all categories
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const categories = await db.categoryStore.getAllCategories();
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all categories",
    notes: "Returns all categories",
    response: { schema: CategoryArraySpec, failAction: validationError },
  },

  // Find one specific category
  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        return category;
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Find a Category",
    notes: "Returns a Category",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  // Create one category
  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = request.payload;
        const newCategory = await db.categoryStore.addCategory(category);
        if (newCategory) {
          return h.response(newCategory).code(201);
        }
        return Boom.badImplementation("error creating Category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Category",
    notes: "Returns the newly created Category",
    validate: { payload: CategorySpec, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  // Delete one specific category
  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        await db.categoryStore.deleteCategoryById(category._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Delete a Category",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  // Update one specific category
  updateOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.categoryStore.updateCategory(request.payload);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a Category",
    notes: "One categoryApi gets updated",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  // Delete all categories
  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.categoryStore.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all CategoryApi",
  },
};

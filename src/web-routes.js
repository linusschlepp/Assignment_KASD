import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/acccounts-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { categoryController } from "./controllers/categories-controller.js";

/**
 * Solely implemented for the handlebars, which have been implemented for testing the backend
 *
 * @type {[{path: string, method: string, config: {handler: function(*, *): *, auth: boolean}},{path: string, method: string, config: {handler: function(*, *): *, auth: boolean}},{path: string, method: string, config: {handler: function(*, *): *, auth: boolean}},{path: string, method: string, config: {handler: function(*, *): *, auth: boolean}},{path: string, method: string, config: {handler: function(*, *): Promise<*>, auth: boolean, validate: {payload: Joi.ObjectSchema<any>, failAction: function(*, *, *): *}}},null,null,null,null,null,null,null,null]}
 */

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addplacemark", config: categoryController.addPlacemark },
  { method: "GET", path: "/category/{id}/deletecategory/{placemarkid}", config: categoryController.deletePlacemark },
];

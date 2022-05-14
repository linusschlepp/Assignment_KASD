import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/acccounts-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { categoryController } from "./controllers/categories-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET", path: "/dashboard/deleteplaylist/{id}", config: dashboardController.deleteCategory },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addcategory", config: categoryController.addPlacemark },
  { method: "GET", path: "/category/{id}/deletecategory/{placemarkid}", config: categoryController.deletePlacemark },
];

import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/acccounts-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: dashboardController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
];

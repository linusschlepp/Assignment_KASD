import { userApi } from "./api/users-api.js";
// eslint-disable-next-line import/named
import { placemarkApi } from "./api/placemark-api.js";
import { categoryApi } from "./api/category-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "PUT", path: "/api/users/{id}", config: userApi.updateOne },

  { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  { method: "POST", path: "/api/categories/{id}/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
  { method: "PUT", path: "/api/placemarks/{id}", config: placemarkApi.updateOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "GET", path: "/api/categories/{id}/placemarks", config: placemarkApi.findPlacemarksByCategoryId },
  { method: "PUT", path: "/api/categories/{id}", config: categoryApi.updateOne },

  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },
  { method: "GET", path: "/api/categories", config: categoryApi.find },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "GET", path: "/api/users/{id}/categories", config: categoryApi.findCategoriesByUserId },
  { method: "POST", path: "/api/users/{id}/uploadimage", config: categoryApi.uploadImage },
];

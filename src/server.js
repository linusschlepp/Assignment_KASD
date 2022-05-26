import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Joi from "joi";
import HapiSwagger from "hapi-swagger";
import Inert from "@hapi/inert";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/acccounts-controller.js";
import { apiRoutes } from "./api-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const result = dotenv.config();

if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      // eslint-disable-next-line no-use-before-define
      options: swaggerOptions,
    },
  ]);

  server.validator(Joi);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validateFunc: accountsController.validate,
  });
  server.auth.default("session");

  db.init();
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

const swaggerOptions = {
  info: {
    title: "Placemark API",
    version: "0.1",
  },
};

init();

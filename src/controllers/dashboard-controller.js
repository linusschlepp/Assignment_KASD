import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const playlists = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        playlists: playlists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlacemark: {
    handler: async function (request, h) {
      const newPlacemark = {
        title: request.payload.title,
      };
      await db.placemarkStore.addPlacemark(newPlacemark);
      return h.redirect("/dashboard");
    },
  },
};

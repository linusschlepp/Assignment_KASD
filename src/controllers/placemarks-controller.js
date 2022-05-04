import { db } from "../models/db.js";

export const playlistController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Placemark",
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },

  // addTrack: {
  //     handler: async function (request, h) {
  //         const playlist = await db.playlistStore.getPlaylistById(request.params.id);
  //         const newTrack = {
  //             title: request.payload.title,
  //             artist: request.payload.artist,
  //             duration: Number(request.payload.duration),
  //         };
  //         await db.trackStore.addTrack(playlist._id, newTrack);
  //         return h.redirect(`/playlist/${playlist._id}`);
  //     },
  // },
};

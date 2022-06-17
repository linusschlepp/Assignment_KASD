import * as cloudinary from "cloudinary";
import { writeFileSync, writeFile } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
};
cloudinary.config(credentials);

export const imageStore = {
  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imageFile) {
    // imageFile = Buffer.from("C:C:\\Users\\linus\\Downloads");
    await writeFileSync("./public/temp.img", imageFile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  deleteImage: async function (img) {
    await cloudinary.v2.uploader.destroy(img, {});
  },
};

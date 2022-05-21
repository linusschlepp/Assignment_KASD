import axios from "axios";

// import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  playtimeUrl: "http://localhost:3000",

  async createUser(user) {
    const res = await axios.post(`${this.playtimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async createCategory(category) {
    const res = await axios.post(`${this.playtimeUrl}/api/categories`, category);
    return res.data;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${this.playtimeUrl}/api/categories`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.playtimeUrl}/api/categories/${id}`);
    return response;
  },

  async getAllCategories() {
    const res = await axios.get(`${this.playtimeUrl}/api/categories`);
    return res.data;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`${this.playtimeUrl}/api/placemarks`);
    return res.data;
  },

  async createPlacemark(id, placemark) {
    const res = await axios.post(`${this.playtimeUrl}/api/categories/${id}/placemarks`, placemark);
    return res.data;
  },

  async deleteAllPlacemarks() {
    const res = await axios.delete(`${this.playtimeUrl}/api/placemarks`);
    return res.data;
  },

  async deletePlacemark(id) {
    const res = await axios.delete(`${this.playtimeUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/categories/${id}`);
    return res.data;
  },
};

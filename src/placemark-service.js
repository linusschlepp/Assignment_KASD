import axios from "axios";

/**
 * This placemark-service is only used for the unit-tests within the backend
 *
 * @type {{placemarkUrl: string, getAllUsers(): Promise<any>, clearAuth(): Promise<void>, authenticate(*): Promise<any>, getUser(*): Promise<any>, updateCategory(*, *): Promise<any>, getCategory(*): Promise<any>, updateUser(*, *): Promise<any>, getAllCategories(): Promise<any>, getAllPlacemarks(): Promise<any>, deleteCategory(*): Promise<AxiosResponse<any>>, deleteAllPlacemarks(): Promise<any>, createPlacemark(*, *): Promise<any>, deletePlacemark(*): Promise<any>, getPlacemark(*): Promise<any>, deleteAllUsers(): Promise<any>, deleteAllCategories(): Promise<any>, createUser(*): Promise<any>, createCategory(*): Promise<any>}}
 */

export const placemarkService = {
  placemarkUrl: "http://localhost:4000",

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async updateUser(id, user) {
    const res = await axios.put(`${this.placemarkUrl}/api/users/${id}`, user);
    return res.data;
  },

  async createCategory(category) {
    const res = await axios.post(`${this.placemarkUrl}/api/categories`, category);
    return res.data;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${this.placemarkUrl}/api/categories`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/categories/${id}`);
    return response;
  },

  async getAllCategories() {
    const res = await axios.get(`${this.placemarkUrl}/api/categories`);
    return res.data;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks`);
    return res.data;
  },

  async createPlacemark(id, placemark) {
    const res = await axios.post(`${this.placemarkUrl}/api/categories/${id}/placemarks`, placemark);
    return res.data;
  },

  async deleteAllPlacemarks() {
    const res = await axios.delete(`${this.placemarkUrl}/api/placemarks`);
    return res.data;
  },

  async deletePlacemark(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async updateCategory(id, category) {
    const res = await axios.put(`${this.placemarkUrl}/api/categories/${id}`, category);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/categories/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },
};

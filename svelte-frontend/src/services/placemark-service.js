import axios from "axios";
import { user } from "../stores.js";

export class PlacemarkService {
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    const placemarkCredentials = localStorage.donation;
    if (placemarkCredentials) {
      const savedUser = JSON.parse(placemarkCredentials);
      user.set({
        email: savedUser.email,
        token: savedUser.token,
      });
      axios.defaults.headers.common.Authorization = `Bearer ${savedUser.token}`;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token,
          // _id: response.data.userId,
        });
        console.log(response);
        localStorage.donation = JSON.stringify({ email: email, token: response.data.token });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async logout() {
    user.set({
      email: "",
      token: "",
    });
    console.log("logout");
    axios.defaults.headers.common.Authorization = "";
    localStorage.removeItem("donation");
  }

  async signup(firstName, lastName, email, password) {
    const adminUser = email === "placemark@admin.com";
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        admin: adminUser,
      };
      await axios.post(`${this.baseUrl}/api/users`, userDetails);
      return true;
    } catch (error) {
      return false;
    }
  }

  async addPlacemark_(placemark, category) {
    console.log(placemark);
    try {
      const response = await axios.post(`${this.baseUrl}/api/categories/${category._id}/placemarks`, placemark);
      console.log(response.status);
      return response.status === 200 || response.status === 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getCategories() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/categories`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async addCategory_(category) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/categories`, category);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getPlacemarks() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/placemarks`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getPlacemarksByCategoryId(category) {
    try {
      const response = await axios.get(`${this.baseUrl}/api/categories/${category.id}/placemarks`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getCategoriesByUserId(userNeeded) {
    console.log("hallo");
    try {
      const response = await axios.get(`${this.baseUrl}/api/users/${userNeeded._id}/categories`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async deletePlacemarkById_(placemarkId) {
    console.log(placemarkId);
    try {
      const response = await axios.delete(`${this.baseUrl}/api/placemarks/${placemarkId}`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getUsers() {
    try {
      console.log("get Users");
      const response = await axios.get(`${this.baseUrl}/api/users`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getFilteredCategoryList(userMail) {
    const userList = await this.getUsers();
    const activeUser = userList.find((userToFind) => userToFind.email === userMail);
    const categoryList = await this.getCategories();
    return categoryList.filter((category) => category.userid === activeUser._id);
  }

  async getFilteredPlacemarkList(userMail, placemarkList) {
    const categoryList = await this.getFilteredCategoryList(userMail);
    console.log(categoryList);
    const tempPlacemarkList = [];
    placemarkList.forEach((placemark) => {
      console.log(placemark.categoryid);
      if (categoryList.map((category) => category._id).includes(placemark.categoryid)) tempPlacemarkList.push(placemark);
    });
    return tempPlacemarkList;
  }
}

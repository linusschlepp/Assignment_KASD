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

  /**
   * Authenticates user, which wants to log in
   *
   * @param email mail of the user
   * @param password password of the user
   * @returns {Promise<boolean>}
   */
  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      if (response.data.success) {
        // Email and token of current user get set
        user.set({
          email: email,
          token: response.data.token,
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

  /**
   * Logs user out
   *
   *
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line class-methods-use-this
  async logout() {
    // Email and token of current user gets resetted
    user.set({
      email: "",
      token: "",
    });
    axios.defaults.headers.common.Authorization = "";
    localStorage.removeItem("donation");
  }

  /**
   * Signs up user by added him to database via post-command
   *
   * @param firstName First name of the user
   * @param lastName Last name of the user
   * @param email Email of the user
   * @param password Password of the user
   * @returns {Promise<boolean>}
   */
  async signup(firstName, lastName, email, password) {
    // If mail is placemark@admin.com the user is automatically assigned admin-status
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

  /**
   * Adds placemark, via post-command
   *
   * @param placemark Placemark, which is added
   * @param category Corresponding category of the placemark
   * @returns {Promise<boolean>}
   */
  async addPlacemark(placemark, category) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/categories/${category._id}/placemarks`, placemark);
      return response.status === 200 || response.status === 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * Gets all categories, via get-command
   *
   * @returns {Promise<*[]|*>}
   */
  async getCategories() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/categories`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Adds a category, via post-command
   *
   * @returns {Promise<*[]|*>}
   */
  async addCategory(category) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/categories`, category);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Gets all placemarks, via get-command
   *
   * @returns {Promise<*[]|*>}
   */
  async getPlacemarks() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/placemarks`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Deletes placemark, corresponding to specific id, via delete-command
   *
   * @param placemarkId Id, of the placemark, which is deleted
   * @returns {Promise<*[]|*>}
   */
  async deletePlacemarkById(placemarkId) {
    try {
      const response = await axios.delete(`${this.baseUrl}/api/placemarks/${placemarkId}`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Deletes category, corresponding to specific id, via delete-command
   *
   * @param categoryId Id, of the category, which is deleted
   * @returns {Promise<*[]|*>}
   */
  async deleteCategoryById(categoryId) {
    try {
      const response = await axios.delete(`${this.baseUrl}/api/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Deletes user, corresponding to specific id, via delete-command
   *
   * @param userId Id, of the user, which is deleted
   * @returns {Promise<*[]|*>}
   */
  async deleteUserById(userId) {
    try {
      const response = await axios.delete(`${this.baseUrl}/api/users/${userId}`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Updates user, corresponding to specific id, via put-command
   *
   * @param userId Id, of the user, which is updated
   * @param userToUpdate New User-Object
   * @returns {Promise<*[]|*>}
   */
  async updateUserById(userId, userToUpdate) {
    try {
      const response = await axios.put(`${this.baseUrl}/api/users/${userId}`, userToUpdate);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Updates placemark, corresponding to specific id, via put-command
   *
   * @param placemarkId Id, of the placemark, which is updated
   * @param placemarkToUpdate New Placemark-Object
   * @returns {Promise<*[]|*>}
   */
  async updatePlacemarkById(placemarkId, placemarkToUpdate) {
    try {
      const response = await axios.put(`${this.baseUrl}/api/placemarks/${placemarkId}`, placemarkToUpdate);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Updates category, corresponding to specific id, via put-command
   *
   * @param categoryId Id, of the category, which is updated
   * @param categoryToUpdate New Category-Object
   * @returns {Promise<*[]|*>}
   */
  async updateCategoryById(categoryId, categoryToUpdate) {
    try {
      const response = await axios.put(`${this.baseUrl}/api/categories/${categoryId}`, categoryToUpdate);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Gets all users, via get-command
   *
   * @returns {Promise<*[]|*>}
   */
  async getUsers() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/users`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Gets all categories, corresponding to user-mail
   *
   * @param userMail Mail of the user, of whom the categories are needed
   * @returns {Promise<T[]>}
   */
  async getCategoriesByMail(userMail) {
    const userList = await this.getUsers();
    const activeUser = userList.find((userToFind) => userToFind.email === userMail);
    const categoryList = await this.getCategories();
    return categoryList.filter((category) => category.userid === activeUser._id);
  }

  /**
   * Gets all placemarks, corresponding to user-mail
   *
   * @param userMail Mail of the user, of whom the placemarks are needed
   * @param placemarkList List of all placemarks
   * @returns {Promise<T[]>}
   */
  async getPlacemarksByMail(userMail, placemarkList) {
    const categoryList = await this.getCategoriesByMail(userMail);
    const tempPlacemarkList = [];
    placemarkList.forEach((placemark) => {
      if (categoryList.map((category) => category._id).includes(placemark.categoryid)) tempPlacemarkList.push(placemark);
    });
    return tempPlacemarkList;
  }
}

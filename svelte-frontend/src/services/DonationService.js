import axios from "axios";

export class DonationService {
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async login(email, password) {
    try {
      console.log("in donationService");
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

      return response.data.success;
    } catch (error) {
      return false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async logout() {
    axios.defaults.headers.common.Authorization = "";
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
}

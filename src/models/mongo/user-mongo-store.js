import { User } from "./user.js";
import { Placemark } from "./placemark.js";

export const userMongoStore = {
  /**
   * Gets all users
   *
   * @returns {Promise<Query<LeanDocument<Array<HydratedDocument<any, {}, {}>>[number]>[] | LeanDocument<any>[], any, {}, any>>}
   */
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  /**
   * Returns a user, corresponding to a specific id
   *
   * @param id Id, of the user, which is required
   * @returns {Promise<null|Query<any, any, {}, any>>}
   */
  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  /**
   * Adds a user
   *
   * @param user User, which is added
   * @returns {Promise<Query<any, any, {}, any>|null>}
   */
  async addUser(user) {
    const userDb = await User.findOne({ email: user.email }).lean();
    /*
     checks if the database already contains the given mail-address
     if yes, the user is not added
      */
    if (userDb) {
      return userDb;
    }

    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  /**
   * Gets user, corresponding to specific mail
   *
   * @param email Email of the user, which is required
   * @returns {Promise<Query<any, any, {}, any>>}
   */
  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  /**
   * Deletes a user, corresponding to a specific id
   *
   * @param id Id, of the user, which is deleted
   * @returns {Promise<void>}
   */
  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },
  /**
   * Deletes all users
   *
   * @returns {Promise<void>}
   */
  async deleteAll() {
    await User.deleteMany({});
  },

  /**
   * Updates a user
   *
   * @param updatedUser User, which is updated
   * @returns {Promise<void>}
   */
  async updateUser(updatedUser) {
    const user = await User.findOne({ _id: updatedUser._id });
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.admin = updatedUser.admin;
    user.password = updatedUser.password;
    await user.save();
  },
};

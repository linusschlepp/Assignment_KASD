import { User } from "./user.js";
import { Placemark } from "./placemark.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const userDb = await User.findOne({ email: user.email }).lean();
    /*
     checks if the database already contains the given mail-address
     if yes, the user is not added
      */
    if (userDb) {
      return null;
    }

    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async updateUser(updatedUser) {
    const user = await User.findOne({ _id: updatedUser._id });
    //   user.name = updatedUser.name;
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    await user.save();
  },
};

import { Placemark } from "./placemark.js";
import { Category } from "./category.js";

export const placemarkMongoStore = {
  /**
   * Returns placemarks, corresponding to category id
   *
   * @param id Id of the category, of which the placemarks are needed
   * @returns {Promise<Query<LeanDocument<Array<HydratedDocument<any, {}, {}>>[number]>[] | LeanDocument<any>[], any, {}, any>>}
   */
  async getPlacemarksByCategoryId(id) {
    const placemarks = await Placemark.find({ categoryid: id }).lean();
    return placemarks;
  },

  /**
   * Gets all placemarks
   *
   * @returns {Promise<Query<LeanDocument<Array<HydratedDocument<any, {}, {}>>[number]>[] | LeanDocument<any>[], any, {}, any>>}
   */
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  /**
   * Adds a placemark
   *
   * @param categoryId Id, of the corresponding category
   * @param placemark Placemark, which is added
   * @returns {Promise<Query<any, any, {}, any>|null>}
   */
  async addPlacemark(categoryId, placemark) {
    placemark.categoryid = categoryId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  /**
   * Returns a placemark, corresponding to a specific id
   *
   * @param id Id, of the placemark, which is required
   * @returns {Promise<null|Query<any, any, {}, any>>}
   */
  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  /**
   * Deletes a placemark, corresponding to a specific id
   *
   * @param id Id, of the placemark, which is being deleted
   * @returns {Promise<null|Query<DeleteResult, any, {}, any>>}
   */
  async deletePlacemarkById(id) {
    try {
      const placemark = await Placemark.deleteOne({ _id: id });
      return placemark;
    } catch (error) {
      console.log("bad id");
    }
    return null;
  },

  /**
   * Deletes all placemarks
   *
   * @returns {Promise<void>}
   */
  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  /**
   * Updates a placemark
   *
   * @param updatedPlacemark Placemark, which is updated
   * @returns {Promise<void>}
   */
  async updatePlacemark(updatedPlacemark) {
    const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
    placemark.name = updatedPlacemark.name;
    placemark.description = updatedPlacemark.description;
    placemark.latitude = updatedPlacemark.latitude;
    placemark.longitude = updatedPlacemark.longitude;
    placemark.img = updatedPlacemark.img;
    await placemark.save();
  },
};

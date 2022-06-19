// eslint-disable-next-line import/named
import { Category } from "./category.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const categoryMongoStore = {
  /**
   * Gets all categories
   *
   * @returns {Promise<Query<LeanDocument<Array<HydratedDocument<any, {}, {}>>[number]>[] | LeanDocument<any>[], any, {}, any>>}
   */
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  /**
   * Returns a category, corresponding to a specific id
   *
   * @param id Id, of the category, which is required
   * @returns {Promise<null|Query<any, any, {}, any>>}
   */
  async getCategoryById(id) {
    if (id) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.placemarks = await placemarkMongoStore.getPlacemarksByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  /**
   * Adds a category
   *
   * @param category Category, which is added
   * @returns {Promise<Query<any, any, {}, any>|null>}
   */
  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  /**
   * Gets all categories, corresponding to specific user id
   *
   * @param id
   * @returns {Promise<Query<LeanDocument<Array<HydratedDocument<any, {}, {}>>[number]>[] | LeanDocument<any>[], any, {}, any>>}
   */
  async getUserCategories(id) {
    const category = await Category.find({ userid: id }).lean();
    return category;
  },

  /**
   * Deletes a category, corresponding to a specific id
   *
   * @param id Id, of the category, which is being deleted
   * @returns {Promise<void>}
   */
  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  /**
   * Deletes all categories
   *
   * @returns {Promise<void>}
   */
  async deleteAllCategories() {
    await Category.deleteMany({});
  },

  /**
   * Updates a category
   *
   * @param updatedCategory Category, which is updated
   * @returns {Promise<void>}
   */
  async updateCategory(updatedCategory) {
    const category = await Category.findOne({ _id: updatedCategory._id });
    category.name = updatedCategory.name;
    await category.save();
  },
};

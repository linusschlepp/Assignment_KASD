import { getContext } from "svelte";
import { user } from "../stores.js";

export class FilterService {
  placemarkService = getContext("PlacemarkService");

  // eslint-disable-next-line class-methods-use-this
  async getFilteredCategoryList() {
    const userList = await PlacemarkService.getUsers();
    const activeUser = userList.find((userToFind) => userToFind.email === $user.email);
    const categoryList = await PlacemarkService.getCategories();
    return categoryList.filter((category) => category.userid === activeUser._id);
  }

  // eslint-disable-next-line class-methods-use-this
  async getPlacemarkList() {
    const placemarkList = await PlacemarkService.getPlacemarks();
    return placemarkList;
  }
}

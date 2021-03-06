import { assert } from "chai";
// eslint-disable-next-line import/named
import { placemarkService } from "../../src/placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { linus, cities, testCategories, linusCredentials } from "../fixtures.js";
import { CategorySpecPlus } from "../../src/models/joi-schemas.js";

suite("Categories API tests", () => {
  let user = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(linus);
    await placemarkService.authenticate(linusCredentials);
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(linus);
    await placemarkService.authenticate(linusCredentials);
    cities.userid = user._id;
  });

  teardown(async () => {});

  test("create category", async () => {
    const returnedCategory = await placemarkService.createCategory(cities);
    assert.isNotNull(returnedCategory);
    assertSubset(cities, returnedCategory);
  });

  test("delete a category", async () => {
    const category = await placemarkService.createCategory(cities);
    const response = await placemarkService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await placemarkService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      testCategories[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createCategory(testCategories[i]);
    }
    // TODO: Check why this does not work?.
    let returnedLists = await placemarkService.getAllCategories();
    assert.equal(returnedLists.length, testCategories.length);
    await placemarkService.deleteAllCategories();
    returnedLists = await placemarkService.getAllCategories();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await placemarkService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });
});

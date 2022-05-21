import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategories, testPlacemarks, cities, rivers, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Track Model tests", () => {
  let beethovenList = null;

  setup(async () => {
    db.init();
    await db.categoryStore.deleteAllCategories();
    await db.placemarkStore.deleteAllPlacemarks();
    beethovenList = await db.categoryStore.addCategory(cities);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(beethovenList._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const mozartList = await db.categoryStore.addCategory(cities);
    const placemark = await db.placemarkStore.addPlacemark(mozartList._id, cities);
    assert.isNotNull(placemark._id);
    assertSubset(cities, placemark);
  });

  test("create multiple placemarkApi", async () => {
    const tracks = await db.categoryStore.getCategoryById(beethovenList._id);
    assert.equal(testPlacemarks.length, testPlacemarks.length);
  });

  test("delete all placemarkApi", async () => {
    const tracks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, tracks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newTracks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newTracks.length);
  });

  test("get a track - success", async () => {
    const mozartList = await db.categoryStore.addCategory(cities);
    const placemark = await db.placemarkStore.addPlacemark(mozartList._id, cities);
    const newTrack = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset(cities, newTrack);
  });

  test("delete One Track - success", async () => {
    const id = testPlacemarks[0]._id;
    await db.placemarkStore.deletePlacemark(id);
    const tracks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(tracks.length, testCategories.length - 1);
    const deletedTrack = await db.placemarkStore.getPlacemarkById(id);
    assert.isNull(deletedTrack);
  });

  test("get a playlist - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete One User - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testPlacemarks.length);
  });
});

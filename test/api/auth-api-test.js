import { assert } from "chai";
import { placemarkService } from "../../src/placemark-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { linus } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    await placemarkService.clearAuth();
    console.log("before");
    await placemarkService.createUser(linus);
    console.log("after");
    await placemarkService.authenticate(linus);
    await placemarkService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await placemarkService.createUser(linus);
    const response = await placemarkService.authenticate(linus);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await placemarkService.createUser(linus);
    const response = await placemarkService.authenticate(linus);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    placemarkService.clearAuth();
    try {
      await placemarkService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});

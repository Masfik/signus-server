import UserModel from "../models/user-model";
import { assert } from "chai";

describe("Deleting records in MongoDB", () => {
  let user;

  // Create user for tests
  beforeEach(async () => {
    user = new UserModel({
      firstName: "Testy",
      lastName: "McTestFace",
      username: "test",
      email: "example@test.com",
      password: "test..123",
      chats: {
        recipient: ["Masfik", "BoJo"]
      }
    });

    await user.save();
  });

  // Tests
  it("Finds the first matching record and removes it", async () => {
    await UserModel.findOneAndRemove({ username: "test" });

    const response = await UserModel.findOne({ username: "test" });
    assert(response === null);
  });
});

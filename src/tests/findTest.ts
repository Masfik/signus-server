import { assert } from "chai";
import UserModel from "../models/user-model";

describe("Finding records in MongoDB", () => {
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
  it("Finds the first matching record by username", async () => {
    const response = await UserModel.findOne({ username: "test" });

    assert(response["username"] === "test");
  });

  it("Finds first matching record by ID", async () => {
    const response = await UserModel.findOne({ _id: user._id });

    assert(response._id.toString() === user._id.toString());
  });
});

import UserModel from "../models/user-model";
import { assert } from "chai";

describe("Saving records in MongoDB", () => {
  // Tests
  it("Creates a user", async () => {
    let user = new UserModel({
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
    assert(user.isNew === false);
  });
});

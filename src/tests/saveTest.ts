import { assert } from "chai";
import UserModel, { User } from "../models/user-model";

describe("Saving records in MongoDB", () => {
  // Tests
  it("Creates a user", async () => {
    const user = new UserModel(<User>{
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

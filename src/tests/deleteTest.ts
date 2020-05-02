import { User } from "../models/user";
import { assert } from "chai";

describe("Deleting records in MongoDB", () => {
  let user;

  // Create user for tests
  beforeEach(async () => {
    user = new User({
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
    await User.findOneAndRemove({ username: "test" });

    const response = await User.findOne({ username: "test" });
    assert(response === null);
  });
});

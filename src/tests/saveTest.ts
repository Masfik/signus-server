import { User } from "../models/user";
import { assert } from "chai";

describe("Saving records in MongoDB", () => {
  // Tests
  it("Creates a user", async () => {
    let user = new User({
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

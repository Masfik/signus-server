import { User } from "../models/user";
import { assert } from "chai";

describe("Saving records in MongoDB", () => {
  // Tests
  it("Creates a user", done => {
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

    user.save().then(() => {
      assert(user.isNew === false);
      done();
    });
  });
});

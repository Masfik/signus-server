import { User } from "../models/user";
import { assert } from "console";

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

    user.save().then(error => {
      if (error) console.log(error);

      assert(user.isNew === false);
      done();
    });
  });
});

import { User } from "../models/user";
import { assert } from "chai";

describe("Deleting records in MongoDB", () => {
  let user;

  // Create user for tests
  beforeEach(done => {
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

    user.save().then(() => {
      done();
    });
  });

  // Tests
  it("Finds the first matching record and removes it", done => {
    User.findOneAndRemove({ username: "test" }).then(() => {
      User.findOne({ username: "test" }).then(response => {
        assert(response === null);
        done();
      });
    });
  });
});

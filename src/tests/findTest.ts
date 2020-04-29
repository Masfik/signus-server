import { User } from "../models/user";
import { assert } from "console";
import { userInfo } from "os";

describe("Finding records in MongoDB", () => {
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

    user.save().then(error => {
      if (error) console.log(error);

      assert(user.isNew === false);
      done();
    });
  });

  // Tests
  it("Finds the first matching record by username", done => {
    User.findOne({ username: "test" }).then(response => {
      assert(response["username"] === "test");
      done();
    });
  });
  it("Finds first matching record by ID", done => {
    User.findOne({ _id: user._id }).then(response => {
      assert(response._id.toString() === user._id.toString());
      done();
    });
  });
});

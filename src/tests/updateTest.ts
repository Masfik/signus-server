import { User } from "../models/user";
import { assert } from "chai";

describe("Updating records in MongoDB", () => {
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
  it("Finds the first matching record and updates it", async () => {
    await User.findOneAndUpdate(
      { username: "test" },
      { password: "GreatThisWorks!" }
    );

    const response = await User.findOne({ username: "test" });
    assert(response["password"] === "GreatThisWorks!");
  });

  it("Appends a recipient to the chats object list", async () => {
    await User.findOneAndUpdate(
      { username: "test" },
      {
        $push: { "chats.recipient": "Covfefe" }
      }
    );

    const record = await User.findOne({ username: "test" });
    assert(record["chats"]["recipient"].includes("Covfefe"));
  });
});

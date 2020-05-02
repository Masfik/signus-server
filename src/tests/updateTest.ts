import { assert } from "chai";
import UserModel from "../models/user-model";

describe("Updating records in MongoDB", () => {
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
  it("Finds the first matching record and updates it", async () => {
    await UserModel.findOneAndUpdate(
      { username: "test" },
      { password: "GreatThisWorks!" }
    );

    const response = await UserModel.findOne({ username: "test" });
    assert(response["password"] === "GreatThisWorks!");
  });

  it("Appends a recipient to the chats object list", async () => {
    await UserModel.updateOne(
      { username: "test" },
      {
        $push: { "chats.recipient": "Covfefe" }
      }
    );

    const record = await UserModel.findOne({ username: "test" });
    assert(record["chats"]["recipient"].includes("Covfefe"));
  });

  it("Removes a chatlog from the recipient list", async () => {
    await UserModel.updateOne(
      { username: "test" },
      {
        $pull: { "chats.recipient": "Masfik" }
      }
    );

    const response = await UserModel.findOne({ "chats.recipient": "Masfik" });
    assert(response === null);
  });

  it("Flush chatlog", async () => {
    await UserModel.updateOne(
      { username: "test" },
      { $set: { "chats.recipient": [] } }
    );

    const response = await UserModel.findOne({ username: "test" });
    assert(response.chats.recipient.length === 0);
  });
});

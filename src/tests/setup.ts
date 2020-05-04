import { mongodb } from "../db";
import UserModel from "../models/user-model";

before(async () => {
  // Connect to signus database
  mongodb
    .then(() => {
      console.log(
        "Connection to mongodb has been succesfully established! (Mocha)"
      );
    })
    .catch(error => {
      console.log("Connection error (mongodb):", error);
    });
});

// Drop the users collection before each test
beforeEach(async () => {
  // Drop the collection
  await UserModel.deleteOne({ user: "test" });
  console.log("Test User deleted");
});

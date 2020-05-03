import * as mongoose from "mongoose";
import * as config from "../config.json";
import UserModel from "./models/user-model";

// Connection variable to mongodb
const mongodb = mongoose.connect(`mongodb://${config.database.host}`, {
  // the following lines are required to handle deprecation warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

before(done => {
  // Connect to Signus database
  mongodb
    .then(() => {
      console.log("Connection has been successfully established!");
      done();
    })
    .catch(error => {
      console.log("Connection error:", error);
    });
});

// Drop the users collection before each test
beforeEach(async () => {
  // Drop the collection
  await UserModel.deleteMany({});
});
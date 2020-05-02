import * as mongoose from "mongoose";
import * as config from "../config.json";
import { User } from "./models/user";

// Connection variable to mongodb
const mongodb = mongoose.connect("mongodb://" + config.database.host, {
  // the following lines are required to handle deprecation warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

before(done => {
  // Connect to signus database
  mongodb
    .then(() => {
      console.log("Connection has been succesfully established!");
      done();
    })
    .catch(error => {
      console.log("Connection error:", error);
    });
});

// Drop the users collection before each test
beforeEach(async () => {
  // Drop the collection
  await User.remove({});
});

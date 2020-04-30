import * as mongoose from "mongoose";
import * as config from "../config.json";

// Connection variable to mongodb
const mongodb = mongoose.connect("mongodb://" + config.database.host, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
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
beforeEach(done => {
  // Drop the collection
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});

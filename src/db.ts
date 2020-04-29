import * as mongoose from "mongoose";

// Connection variable to mongodb
const mongodb = mongoose.connect("mongodb://ovh.bitward.co.uk/signus", {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

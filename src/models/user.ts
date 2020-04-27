import * as mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  password: String,
  chats: {
    recipient: [String]
  }
});

const user = mongoose.model("user", userSchema);

module.exports = user;

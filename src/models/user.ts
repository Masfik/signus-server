import * as mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  chats: {
    recipient: [String]
  }
});

export const User = mongoose.model("User", userSchema);

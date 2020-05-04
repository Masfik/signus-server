import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { User } from "./user";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"]
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"]
  },
  username: {
    type: String,
    unique: [true, "username must be unique"],
    required: [true, "username is required"]
  },
  email: {
    type: String,
    unique: [true, "email must be unique"],
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  chats: {
    recipient: [String]
  },
  token: String
});

export default mongoose.model<User>("User", userSchema);

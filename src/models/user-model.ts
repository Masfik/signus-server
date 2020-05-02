import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { User } from "./user";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  chats: {
    recipient: [String]
  }
});

export default mongoose.model<User>("User", userSchema);

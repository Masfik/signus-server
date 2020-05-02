import * as mongoose from "mongoose";
const { Schema } = mongoose;

interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  chats: {
    recipient: string[];
  };
}

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

export const User = mongoose.model("User", userSchema);

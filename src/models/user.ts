import { Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  chats?: {
    recipient: string[];
  };
}

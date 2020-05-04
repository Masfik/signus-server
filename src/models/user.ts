import { Document } from "mongoose";

export interface User extends Document {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  chats?: {
    recipient: string[];
  };
}

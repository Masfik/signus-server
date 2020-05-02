import { User } from "../../../models/user-model";

export default interface UserUpdate {
  type: UserUpdateType;
  user: User;
}

export enum UserUpdateType {
  AUTH_USER,
  USER
}

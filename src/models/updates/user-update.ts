import { User } from "../user-model";

export enum UserUpdateType {
  AUTH_USER,
  USER
}

export default interface UserUpdate {
  type: UserUpdate;
  user: User;
}

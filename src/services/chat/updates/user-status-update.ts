export default interface UserStatusUpdate {
  userId: String;
  status: UserStatus;
}

export enum UserStatus {
  OFFLINE,
  ONLINE,
  BUSY
}

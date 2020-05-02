export default interface UserStatusUpdate {
  userId: String;
  status: UserStatus;
}

export enum UserStatus {
  ONLINE,
  OFFLINE,
  BUSY
}

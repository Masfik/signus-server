import MessageUpdate from "./updates/message-update";
import UserUpdate from "./updates/user-update";
import UserStatusUpdate from "./updates/user-status-update";
import { User } from "../../models/user";

export default abstract class Chat<T> {
  protected constructor(
    readonly client: T,
    readonly sender: User,
    readonly recipient: User
  ) {}

  abstract sendMessage(message: MessageUpdate): void;

  // TODO: WIP
  abstract sendUserUpdate(userUpdate: UserUpdate): void;

  // TODO: WIP
  abstract sendUserUpdateStatus(userStatusUpdate: UserStatusUpdate): void;
}

import MessageUpdate from "./updates/message-update";
import UserUpdate from "./updates/user-update";
import UserStatusUpdate from "./updates/user-status-update";
import { Clients } from "./chat-service";

export default abstract class Chat<T> {
  protected constructor(public readonly clients: Clients<T>) {}

  abstract sendMessage(messageUpdate: MessageUpdate): void;

  abstract sendUserUpdate(userUpdate: UserUpdate): void;

  abstract sendUserUpdateStatus(userStatusUpdate: UserStatusUpdate): void;
}

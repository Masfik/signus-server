import MessageUpdate from "./updates/message-update";
import UserUpdate from "./updates/user-update";
import UserStatusUpdate from "./updates/user-status-update";

export default abstract class ChatService<T> {
  protected _started = false;

  protected _chatClients: {
    [id: string]: T;
  } = {};

  abstract start(): void;

  abstract sendMessage(messageUpdate: MessageUpdate): void;

  abstract sendUserUpdate(userUpdate: UserUpdate): void;

  abstract sendUserUpdateStatus(userStatusUpdate: UserStatusUpdate): void;
}

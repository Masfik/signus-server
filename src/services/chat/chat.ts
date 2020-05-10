import { Message } from "./updates/message-update";
import UserUpdate from "./updates/user-update";
import UserStatusUpdate from "./updates/user-status-update";

export default abstract class Chat<T> {
  id: string;

  protected constructor(protected client: T) {}

  abstract sendMessage(message: Message): void;

  // TODO: WIP
  abstract sendUserUpdate(userUpdate: UserUpdate): void;

  // TODO: WIP
  abstract sendUserUpdateStatus(userStatusUpdate: UserStatusUpdate): void;
}

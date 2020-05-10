import { EventEmitter } from "events";
import { ChatEventEmitter } from "./services/chat/chat-event-emitter";
import { Message } from "./services/chat/updates/message-update";
import UserUpdate from "./services/chat/updates/user-update";
import UserStatusUpdate, {
  UserStatus
} from "./services/chat/updates/user-status-update";
import { database } from "./app";
import { User } from "./models/user";
import { UpdateType } from "./repositories/mongoose/update-type";

const chatHandler: ChatEventEmitter = new EventEmitter();

chatHandler.on("Connection", async chat => {
  await database.repositories.user.updateOne(
    { _id: chat.id },
    <User>{ status: UserStatus.ONLINE.toString() },
    UpdateType.SET
  );
});

chatHandler.on("Close", async chat => {
  await database.repositories.user.updateOne(
    { _id: chat.id },
    <User>{ status: UserStatus.OFFLINE.toString() },
    UpdateType.SET
  );
});

chatHandler.on("MessageUpdate", (chat, message: Message) => {
  chat.sendMessage(message);
  /*
   * A "fromUser" field is currently unnecessary since chats are always one to one at the moment.
   * The current implementation always inserts the sender by default without having to pass it as a parameter.
   * This could be the future usage if group chats are ever implemented: chat.sendMessage(sender, message);
   */
});

chatHandler.on("UserUpdate", chat => {
  chat.sendUserUpdate(<UserUpdate>{});
});

chatHandler.on("UserStatusUpdate", chat => {
  chat.sendUserUpdateStatus(<UserStatusUpdate>{
    userId: "",
    status: UserStatus.ONLINE
  });
});

export default chatHandler;

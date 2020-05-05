import { EventEmitter } from "events";
import { ChatEventEmitter } from "./services/chat/chat-event-emitter";
import MessageUpdate from "./services/chat/updates/message-update";
import UserUpdate from "./services/chat/updates/user-update";
import UserStatusUpdate, {
  UserStatus
} from "./services/chat/updates/user-status-update";

const chatUpdate: ChatEventEmitter = new EventEmitter();

chatUpdate.on("MessageUpdate", chat => {
  chat.sendMessage(<MessageUpdate>{
    chatId: "",
    messageId: Math.random().toString(),
    dateTime: new Date(),
    data: ""
  });
});

chatUpdate.on("UserUpdate", chat => {
  chat.sendUserUpdate(<UserUpdate>{});
});

chatUpdate.on("UserStatusUpdate", chat => {
  chat.sendUserUpdateStatus(<UserStatusUpdate>{
    userId: "",
    status: UserStatus.ONLINE
  });
});

export default chatUpdate;

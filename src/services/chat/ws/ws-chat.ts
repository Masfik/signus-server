import Chat from "../chat";
import MessageUpdate from "../updates/message-update";
import UserUpdate from "../updates/user-update";
import UserStatusUpdate from "../updates/user-status-update";

class WSChat extends Chat<WebSocket> {
  sendMessage(messageUpdate: MessageUpdate): void {}

  sendUserUpdate(userUpdate: UserUpdate): void {}

  sendUserUpdateStatus(userStatusUpdate: UserStatusUpdate): void {}
}

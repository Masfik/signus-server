import Chat from "../chat";
import MessageUpdate, { Message } from "../updates/message-update";
import UserUpdate from "../updates/user-update";
import UserStatusUpdate from "../updates/user-status-update";

class WSChat extends Chat<WebSocket> {
  sendMessage(message: Message): void {
    this.client.send(
      JSON.stringify(<MessageUpdate>{
        chatId: this.client.id,
        ...message
      })
    );
  }

  sendUserUpdate(userUpdate: UserUpdate): void {
    console.log(`${this.client}: ${userUpdate}`); // TODO
  }

  sendUserUpdateStatus(userStatusUpdate: UserStatusUpdate): void {
    console.log(`${this.client}: ${userStatusUpdate}`); // TODO
  }
}

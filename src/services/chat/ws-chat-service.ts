import * as WebSocket from "ws";
import { server } from "../../app";
import ChatService from "./chat-service";
import MessageUpdate from "./updates/message-update";
import UserUpdate from "./updates/user-update";
import UserStatusUpdate from "./updates/user-status-update";

export default class WSChatService extends ChatService<WebSocket> {
  // ws library instance
  private _wsServer = new WebSocket.Server({
    server,
    clientTracking: true
  });

  start(): void {
    if (this._started) return;

    this._wsServer.on("connection", async (currentClient: WebSocket) => {
      /* TODO: replace pseudocode
      currentClient.id = (await mongoose.userRepo.find({ token: header.token })).id;
      chatClients[currentClient.id] = currentClient
        */

      currentClient.on("message", (message: string) => {
        // const jsonMessage = JSON.parse(message);
        console.log(`Received: ${message}`);

        // chatClients[jsonMessage.chatId].send(messageUpdate)
      });

      currentClient.on("close", client => {
        console.log(`${client} disconnected.`);
        /*
        delete chatClients[currentClient.id];
        delete currentClient.id;
      */
      });
    });

    this._started = true;
  }

  sendMessage(messageUpdate: MessageUpdate): void {}

  sendUserUpdate(userUpdate: UserUpdate): void {}

  sendUserUpdateStatus(userUpdate: UserStatusUpdate): void {}
}

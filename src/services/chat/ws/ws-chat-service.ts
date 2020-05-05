import * as WebSocket from "ws";
import { Server } from "http";
import ChatService from "../chat-service";
import MessageUpdate from "../updates/message-update";

export default class WSChatService extends ChatService<WebSocket> {
  constructor(private server: Server) {
    super();
  }

  // ws library instance
  private wsServer = new WebSocket.Server({
    server: this.server,
    clientTracking: true
  });

  start(): void {
    if (this.started) return;

    this.wsServer.on("connection", async (currentClient: WebSocket) => {
      this.chatClients[Math.random().toString()] = currentClient;

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

    this.started = true;
  }

  sendMessage(messageUpdate: MessageUpdate): void {
    this.chatClients[messageUpdate.chatId].send(messageUpdate);
  }
}

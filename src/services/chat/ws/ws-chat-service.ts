import * as WebSocket from "ws";
import { Server } from "http";
import ChatService from "../chat-service";
import MessageUpdate from "../updates/message-update";

export default class WSChatService extends ChatService<WebSocket> {
  constructor(private server: Server) {
    super();
  }

  // WebSocket instance from the "ws" library
  private wsServer = new WebSocket.Server({
    server: this.server,
    clientTracking: true
  });

  start(): void {
    if (this.started) return;

    this.wsServer.on("connection", async (clientSocket, request) => {
      console.log(`[WS] ${request.socket.address()} connected.`);
      this.chatClients[Math.random().toString()] = clientSocket;

      /* TODO: replace pseudocode
      currentClient.id = (await mongoose.userRepo.find({ token: header.token })).id;
      chatClients[currentClient.id] = currentClient
        */

      clientSocket.on("message", (message: string) => {
        // const jsonMessage = JSON.parse(message);
        console.log(`Received: ${message}`);

        // chatClients[jsonMessage.chatId].send(messageUpdate)
      });

      clientSocket.on("close", () => {
        console.log(`[WS] ${request.socket.address()} disconnected.`);
        /*
        delete chatClients[currentClient.id];
        delete currentClient.id;
      */
      });
    });

    this.wsServer.on("upgrade", (request, socket, head) => {
      // TODO authentication
    });

    this.started = true;
  }

  sendMessage(messageUpdate: MessageUpdate): void {
    this.chatClients[messageUpdate.chatId].send(messageUpdate);
  }
}

import * as WebSocket from "ws";
import { Server } from "http";
import ChatService from "../chat-service";
import MessageUpdate from "../updates/message-update";
import ServerStorage from "../../storage/server-storage";
import { ChatEventEmitter } from "../chat-event-emitter";

export default class WSChatService extends ChatService<WebSocket> {
  constructor(
    private server: Server,
    options: {
      storage: ServerStorage<any>;
      handlers: ChatEventEmitter[];
    }
  ) {
    super(options.storage, ...options.handlers);
  }

  // WebSocket instance from the "ws" library
  private wsServer = new WebSocket.Server({
    server: this.server,
    clientTracking: true
  });

  start(): void {
    if (this.started) return;

    console.log("[WS] WebSocket service started.");
    this.wsServer.on("connection", async (clientSocket, request) => {
      console.log(
        `[WS] ${request.socket.remoteAddress} connected with token: ${request.headers.authorization}.`
      );
      clientSocket.id = "";
      this.chatClients[""] = clientSocket;

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
        console.log(`[WS] ${request.socket.remoteAddress} disconnected.`);
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

import * as WebSocket from "ws";
import { Server } from "http";
import ChatService from "../chat-service";
import MessageUpdate from "../updates/message-update";
import ServerStorage from "../../storage/server-storage";
import { ChatEventEmitter } from "../chat-event-emitter";
import { User } from "../../../models/user";
import UserUpdate from "../updates/user-update";
import UserStatusUpdate from "../updates/user-status-update";
import WSChat from "./ws-chat";

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
    clientTracking: true,
    verifyClient: async (info, callback) => {
      const token = info.req.headers.authorization;
      if (!token) callback(false, 401, "Unauthorised");
      else if (await this.userRepo.findOne({ token })) callback(true);
      else callback(false, 401, "Unauthorised");
    }
  });

  private userRepo = this.storage.repositories.user;

  start(): void {
    if (this.started) return;

    console.log("[WS] WebSocket service started.");

    this.wsServer.on("connection", async (clientSocket, request) => {
      console.log(`[WS] ${request.socket.remoteAddress} connected.`);

      // Finding user by token
      const token = request.headers.authorization;
      const user: User = await this.userRepo.findOne({ token });

      // Assigning an ID to the clientSocket and adding it to the list of connected clients
      clientSocket.id = user.id;
      this.chatClients[user.id] = clientSocket;
      // Emitting the connection event
      this.emit("Connection", new WSChat(clientSocket), null);

      clientSocket.on("message", (message: string) => {
        const jsonMessage:
          | MessageUpdate
          | UserUpdate
          | UserStatusUpdate = JSON.parse(message);

        // Type guarding: check if the jsonMessage contains the chatId property
        if ((<MessageUpdate>jsonMessage).chatId) {
          const messageUpdate = <MessageUpdate>jsonMessage;
          const recipient = this.chatClients[messageUpdate.chatId];
          // Swapping chatId with the user ID of the sender
          messageUpdate.chatId = user.id;

          this.emit("MessageUpdate", new WSChat(recipient), messageUpdate);
        } else if ((<UserStatusUpdate>jsonMessage).userId) {
          const messageUpdate = <UserStatusUpdate>jsonMessage;
          // TODO
        }
      });

      clientSocket.on("close", () => {
        console.log(`[WS] ${request.socket.remoteAddress} disconnected.`);
        // Removing clients from chatClients list
        delete this.chatClients[clientSocket.id];
        delete clientSocket.id;
      });
    });

    this.started = true;
  }

  sendMessage(messageUpdate: MessageUpdate): void {
    this.chatClients[messageUpdate.chatId].send(messageUpdate);
  }
}

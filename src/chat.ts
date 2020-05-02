import * as WebSocket from "ws";
import { wsServer } from "./app";

type Chat = { [key: string]: WebSocket };

const chats: Chat = {};

wsServer.on("connection", async (currentClient: WebSocket) => {
  /* TODO: replace pseudocode
  currentClient.id = (await mongoose.userRepo.find({ token: header.token })).id;
  chats[currentClient.id] = currentClient
  */

  chats.currentClient.on("message", (message: string) => {
    const jsonMessage = JSON.parse(message);
    console.log(
      `${jsonMessage.message.sender.username} said: ${jsonMessage.message.data}`
    );

    // TODO: Recreate messageUpdate json

    // chats[jsonMessage.chatId].send(messageUpdate)
  });

  currentClient.on("close", client => {
    console.log(client);
    /*
    chats.remove(client)
    console.log(`${client.id} disconnected`);
     */
  });
});

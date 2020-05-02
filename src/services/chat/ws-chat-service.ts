import * as WebSocket from "ws";
import { wsServer } from "../../app";

type Chat = { [id: string]: WebSocket };

const chatClients: Chat = {};

wsServer.on("connection", async (currentClient: WebSocket) => {
  /* TODO: replace pseudocode
  currentClient.id = (await mongoose.userRepo.find({ token: header.token })).id;
  chatClients[currentClient.id] = currentClient
  */

  currentClient.on("message", (message: string) => {
    // const jsonMessage = JSON.parse(message);
    console.log(`Received: ${message}`);

    // TODO: Recreate messageUpdate json

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

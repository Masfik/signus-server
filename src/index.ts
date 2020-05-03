import { server } from "./app";
import WSChatService from "./services/chat/ws-chat-service";

server.listen(3000, () => {
  console.log("Server is running on port 3000");

  new WSChatService().start();
});

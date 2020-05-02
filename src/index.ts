import { server } from "./app";

server.listen(3000, () => {
  console.log("Server is running on port 3000");
  import("./services/chat/ws-chat-service");
});

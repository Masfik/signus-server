import { server } from "./app";
import { mongodb } from "./db";

server.listen(3000, () => {
  mongodb
    .then(() => {
      console.log("Connection to mongodb has been succesfully established!");
    })
    .catch(error => {
      console.log("Connection error (mongodb):", error);
    });

  console.log("Server is running on port 3000");
  import("./services/chat/ws-chat-service");
});

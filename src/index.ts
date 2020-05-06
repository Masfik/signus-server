import app, { chatService } from "./app";
import { mongodb } from "./db";
import * as config from "../config.json";

mongodb
  .then(() => {
    console.log("Connection to mongodb has been successfully established!");

    app.listen(config.web_server_port, () => {
      console.log(`Server is running on port ${config.web_server_port}`);
    });

    chatService.start();
  })
  .catch(error => {
    console.log("Connection error (mongodb):", error);
  });

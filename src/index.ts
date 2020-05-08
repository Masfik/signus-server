import app, { chatService, database } from "./app";
import * as config from "../config.json";

database
  .connect(config.database)
  .then(() => {
    console.log("Connection to database has been successfully established!");

    app.listen(config.web_server_port, () => {
      console.log(`Server is running on port ${config.web_server_port}`);
    });

    chatService.start();
  })
  .catch(error => {
    console.log("Connection error:", error);
  });

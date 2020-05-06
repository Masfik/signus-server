import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import routes from "./routes/router";
import WSChatService from "./services/chat/ws/ws-chat-service";
import chatHandler from "./chat-updates";
import MongooseStorage from "./services/storage/mongoose/mongoose.storage";

/* * * * *\
* Express *
\* * * * */

const app = express();
// The order of the following few lines is important!
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// initialise routes
app.use(routes);
// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

/* * * * * * *\
* HTTP Server *
\* * * * * * */

const server = http.createServer(app);

/* * * * * * *\
* ChatService *
\* * * * * * */

export const chatService = new WSChatService(server);
chatService.use(chatHandler);

/* * * * * * *\
*   Database  *
\* * * * * * */

export const database = new MongooseStorage();

export default server;

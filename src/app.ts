import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import routes from "./routes/router";
import WSChatService from "./services/chat/ws/ws-chat-service";
import chatHandler from "./chat-updates";
import MongooseStorage from "./services/storage/mongoose/mongoose.storage";

/* * * * *\
* Storage *
\* * * * */

export const database = new MongooseStorage();

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const chatService = new WSChatService(server, {
  storage: database,
  handlers: [chatHandler]
});

export default server;

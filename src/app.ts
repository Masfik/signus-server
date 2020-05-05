import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import routes from "./routes/router";
import WSChatService from "./services/chat/ws/ws-chat-service";

// Express
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

// Server
const server = http.createServer(app);

// ChatService
export const chatService = new WSChatService(server);

export default server;

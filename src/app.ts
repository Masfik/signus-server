import * as express from "express";
import * as http from "http";
import routes from "./routes/router";
import * as bodyParser from "body-parser";

// Express
const app = express();
// The order of the following 2 lines is important!
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(routes);

export const server = http.createServer(app);

export default app;

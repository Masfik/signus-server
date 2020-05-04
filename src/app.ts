import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import routes from "./routes/router";

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

export default http.createServer(app);

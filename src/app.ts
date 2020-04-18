import * as express from "express";
import * as WebSocket from "express-ws";

const app = express();
export const webSocket = WebSocket(app);

export default app;

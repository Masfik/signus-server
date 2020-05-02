import * as WebSocket from "ws";
import * as express from "express";
import * as http from "http";

// Express
const app = express();
export const server = http.createServer(app);

// WebSocket
export const wsServer = new WebSocket.Server({
  server,
  clientTracking: true
});

export default app;

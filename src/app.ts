import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";

const app = http.createServer(express());
export const wsServer = new WebSocket.Server({ server: app });

export default app;

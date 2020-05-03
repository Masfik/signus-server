import * as express from "express";
import * as http from "http";

// Express
const app = express();
export const server = http.createServer(app);

export default app;

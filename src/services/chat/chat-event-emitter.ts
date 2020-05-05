import { EventEmitter } from "events";
import Chat from "./chat";

type Event = "MessageUpdate" | "UserUpdate" | "UserStatusUpdate";

export declare interface ChatEventEmitter extends EventEmitter {
  on(event: Event, callback: (chat: Chat<any>) => void);
}

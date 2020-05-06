import { EventEmitter } from "events";
import Chat from "./chat";

export type ChatEvent = "MessageUpdate" | "UserUpdate" | "UserStatusUpdate";

export declare interface ChatEventEmitter extends EventEmitter {
  on(event: ChatEvent, callback: (chat: Chat<any>, updateContent) => void);
}

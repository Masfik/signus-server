import { EventEmitter } from "events";
import Chat from "./chat";

export type Clients<T> = {
  [id: string]: T;
};
export type EventName = "MessageUpdate" | "UserUpdate" | "UserStatusUpdate";

export default abstract class ChatService<T> {
  protected eventEmitter = new EventEmitter();

  protected started = false;

  protected chatClients: Clients<T> = {};

  on(eventName: EventName, func: (client: T, chat: Chat<T>) => void) {
    this.eventEmitter.on(eventName, func);
  }

  abstract start(): void;
}

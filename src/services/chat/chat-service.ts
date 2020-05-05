import { ChatEventEmitter } from "./chat-event-emitter";

export type Clients<T> = {
  [id: string]: T;
};

export default abstract class ChatService<T> {
  protected handlers: ChatEventEmitter[] = [];

  protected started = false;

  protected chatClients: Clients<T> = {};

  abstract start(): void;

  use(...handlers: ChatEventEmitter[]) {
    this.handlers.push(...handlers);
  }

  protected static emit() {
    console.log("aaaa");
  }
}

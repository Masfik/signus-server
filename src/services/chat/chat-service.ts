import { ChatEventEmitter, ChatEvent } from "./chat-event-emitter";
import Chat from "./chat";
import ServerStorage from "../storage/server-storage";

export type Clients<T> = {
  [id: string]: T;
};

export default abstract class ChatService<T> {
  protected storage: ServerStorage<any>;

  protected handlers: ChatEventEmitter[] = [];

  protected started = false;

  protected chatClients: Clients<T> = {};

  protected constructor(
    storage: ServerStorage<any>,
    ...handlers: ChatEventEmitter[]
  ) {
    this.storage = storage;
    this.handlers.push(...handlers);
  }

  abstract start(): void;

  useHandlers(...handlers: ChatEventEmitter[]) {
    this.handlers.push(...handlers);
  }

  protected emit(event: ChatEvent, chat: Chat<T>, updateData) {
    this.handlers.forEach(emitter => emitter.emit(event, chat, updateData));
  }
}

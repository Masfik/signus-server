import { ChatEventEmitter, ChatEvent } from "./chat-event-emitter";
import Chat from "./chat";

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

  protected emit(event: ChatEvent, chat: Chat<T>, updateData) {
    this.handlers.forEach(emitter => {
      emitter.emit(event, chat, updateData);
    });
  }
}

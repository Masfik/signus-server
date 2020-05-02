import MessageUpdate from "./updates/message-update";

abstract class ChatService<T> {
  chatClients: {
    [id: string]: T;
  } = {};

  abstract start(): void;

  abstract sendMessage(messageUpdate: MessageUpdate): void;

  abstract sendUserUpdate(): void;
}

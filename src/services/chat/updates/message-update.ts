export default interface MessageUpdate extends Message {
  from?: string; // TODO: in case group chats are ever implemented
  chatId: string;
}

export interface Message {
  data: string; // TODO: only text is supported for now
  dateTime: Date;
  messageId?: string;
}

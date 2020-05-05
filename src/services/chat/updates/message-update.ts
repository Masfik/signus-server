export default interface MessageUpdate extends Message {
  chatId: string;
}

export interface Message {
  data: string; // TODO: only text is supported for now
  dateTime: Date;
  messageId?: string;
}

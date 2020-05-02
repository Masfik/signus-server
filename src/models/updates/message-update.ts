export default interface MessageUpdate {
  chatId: string;
  data: string; // TODO: only text is supported for now
  dateTime: Date;
  messageId?: string;
}

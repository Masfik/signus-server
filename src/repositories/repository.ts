export default interface Repository<T> {
  findOne(query: {}): Promise<T>;

  findAll(query: {}): Promise<Array<T>>;

  create(record: T): Promise<T>;

  updateOne(query: {}, record: T, updateType?: any): Promise<T>;

  delete(record: T): Promise<boolean>;
}

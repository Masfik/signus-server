interface Repository<T> {
  findOne(query: {}): Promise<T>;

  findAll(query: {}): Promise<Array<T>>;

  create(record: T): Promise<T>;

  delete(record: T): Promise<void>;
}

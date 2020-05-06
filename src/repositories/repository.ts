enum UpdateType {
  PUSH = "$push",
  SET = "$set"
}

interface Repository<T> {
  findOne(query: {}): Promise<T>;

  findAll(query: {}): Promise<Array<T>>;

  create(record: T): Promise<T>;

  updateOne(query: {}, record: T, type?: UpdateType): Promise<T>;

  delete(record: T): Promise<boolean>;
}

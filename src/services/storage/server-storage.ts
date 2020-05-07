interface ServerStorage<T> {
  connect(config: {
    host: string;
    username: string;
    password: string;
    database: string;
  }): Promise<T>;

  database: T;

  init(): Promise<void> | void;

  close(): Promise<void> | void;
}
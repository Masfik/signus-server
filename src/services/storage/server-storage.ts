import Repository from "../../repositories/repository";

export default interface ServerStorage<T> {
  connect(config: {
    host: string;
    username: string;
    password: string;
    database: string;
  }): Promise<T>;

  database: T;

  repositories: {
    user: Repository<any>;
  };

  init(): Promise<void> | void;

  close(): Promise<void> | void;
}

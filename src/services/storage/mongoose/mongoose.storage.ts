import * as mongoose from "mongoose";
import { Mongoose } from "mongoose";
import ServerStorage from "../server-storage";
import Repository from "../../../repositories/repository";
import { User } from "../../../models/user";

export default class MongooseStorage implements ServerStorage<Mongoose> {
  database: Mongoose;

  repositories: { user: Repository<User> };

  constructor(repositories: { user: Repository<User> }) {
    this.repositories = repositories;
  }

  async connect(config: {
    host: string;
    username: string;
    password: string;
    database: string;
  }): Promise<Mongoose> {
    this.database = await mongoose.connect(`mongodb://${config.host}`, {
      // the following lines are required to handle deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    return this.database;
  }

  close(): Promise<void> | void {
    this.database.disconnect();
  }

  init(): Promise<void> | void {
    console.log(`Running Mongoose version ${this.database.version}`);
  }
}

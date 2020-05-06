import * as mongoose from "mongoose";
import { Mongoose } from "mongoose";

class MongooseStorage implements ServerStorage<Mongoose> {
  database: Mongoose;

  async connect(config: {
    host: string;
    username: string;
    password: string;
    database: string;
  }): Promise<any> {
    this.database = await mongoose.connect(`mongodb://${config.host}`);
    return this.database;
  }

  close(): Promise<void> | void {
    this.database.disconnect();
  }

  init(): Promise<void> | void {
    console.log(`Running Mongoose version ${this.database.version}`);
  }
}

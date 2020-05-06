import { User } from "../../models/user";
import UserModel from "../../models/user-model";

export default class MongooseUserRepository implements Repository<User> {
  async findOne(query: {}): Promise<User> {
    // Find user record in the database
    return await UserModel.findOne(query);
  }

  async findAll(query: {}): Promise<User[]> {
    return []; // TODO
  }

  async create(record: User): Promise<User> {
    return await UserModel.create(record);
  }

  async updateOne(query: {}, record: User, type: UpdateType): Promise<User> {
    return await UserModel.updateOne(query, {
      UpdateType: record
    });
  }

  async delete(record: User): Promise<boolean> {
    const userDelete = await UserModel.deleteOne(record);
    return userDelete == 1 ? true : false;
  }
}

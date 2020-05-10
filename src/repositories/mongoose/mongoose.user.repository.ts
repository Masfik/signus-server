import { User } from "../../models/user";
import UserModel from "./models/user-model";
import Repository from "../repository";
import { UpdateType } from "./update-type";

// TODO: Chats are currently filtered out from the results since they are work in progress.

export default class MongooseUserRepository implements Repository<User> {
  findOne(query: {}): Promise<User> {
    // Find user record in the database
    return UserModel.findOne(query).then((user: User) => {
      if (user == null) return null;

      const newUser: User = user.toObject();
      newUser.id = user._id;
      delete newUser._id;
      delete newUser.__v;
      delete newUser.chats; // TODO
      return newUser;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(query: {}): Promise<User[]> {
    return []; // TODO
  }

  create(record: User): Promise<User> {
    return UserModel.create(record).then((user: User) => {
      const newUser: User = user.toObject();
      newUser.id = user._id;
      delete newUser._id;
      delete newUser.__v;
      delete newUser.password;
      delete newUser.chats; // TODO
      return newUser;
    });
  }

  async updateOne(
    query: {},
    record: User,
    updateType: UpdateType
  ): Promise<void> {
    await UserModel.updateOne(query, {
      [updateType]: record
    });
  }

  delete(record: User): Promise<boolean> {
    return UserModel.deleteOne(record).then(value => value === 1);
  }
}

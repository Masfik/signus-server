import { User } from "../../models/user";
import UserModel from "../../models/user-model";
import Repository from "../repository";
import { UpdateType } from "./update-type";

// TODO: Chats are currently filtered out from the results since they are work in progress.

export default class MongooseUserRepository implements Repository<User> {
  findOne(query: {}): Promise<User> {
    // Find user record in the database
    return UserModel.findOne(query).then((user: User) => {
      if (user == null) return null;
      return <User>{
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password,
        token: user.token
      };
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(query: {}): Promise<User[]> {
    return []; // TODO
  }

  create(record: User): Promise<User> {
    return UserModel.create(record).then((user: User) => {
      return <User>{
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
      };
    });
  }

  updateOne(query: {}, record: User, updateType: UpdateType): Promise<User> {
    return UserModel.updateOne(query, {
      [updateType]: record
    }).then((user: User) => {
      return <User>{
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token: user.token
      };
    });
  }

  delete(record: User): Promise<boolean> {
    return UserModel.deleteOne(record).then(value => value === 1);
  }
}

import { Router } from "express";
import { randomBytes } from "crypto";
import UserRepo from "../repositories/mongoose/mongoose.user.repository";
import { User } from "../models/user";
import { UpdateType } from "../repositories/mongoose/update-type";

const router = Router();
const UserModel = new UserRepo();

router.get("/user/:username", async (req, res, next) => {
  try {
    // Find user record in the database
    const user: User = await UserModel.findOne(<User>{
      username: req.params.username
    });

    if (user != null) {
      delete user.password;
      res.send(user);
    } else res.send({ message: "Error: No user found!" });
  } catch (e) {
    next(e);
  }
});

router.put("/user/chats", async (req, res, next) => {
  await UserModel.updateOne(
    { username: req.body.username },
    <User>{
      chats: {
        recipient: req.body.recipient
      }
    },
    UpdateType.PUSH
  ).catch(next);
  const user = await UserModel.findOne({ username: req.body.username });

  res.send(user);
});

router.get("/login", async (req, res, next) => {
  const { username } = req.body;

  let authUser: User;
  try {
    // Find user record in the database
    authUser = await UserModel.findOne(<User>{ username });
  } catch (e) {
    next(e);
  }

  if (authUser.password === req.body.password) {
    // Generate a random session token for the authenticated user
    randomBytes(48, async (err, buffer) => {
      if (err) throw err;
      const token = await buffer.toString("hex");
      // Save token in mongodb
      await UserModel.updateOne({ username }, <User>{ token }, UpdateType.SET);

      res.send({
        message: "Login successful!",
        user: <User>{
          id: authUser._id,
          username: authUser.username,
          firstName: authUser.firstName,
          lastName: authUser.lastName,
          email: authUser.email,
          chats: authUser.chats,
          token
        }
      });
    });
  } else res.send({ message: "Error: Username/Password mismatch" });
});

router.post("/register", async (req, res, next) => {
  try {
    const user: User = await UserModel.create(req.body);
    delete user.password;
    res.send(user);
  } catch (e) {
    next(e);
  }
});

export default router;

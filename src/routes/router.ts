import { Router } from "express";
import { randomBytes as randomBytesCB } from "crypto";
import * as util from "util";
import { User } from "../models/user";
import { UpdateType } from "../repositories/mongoose/update-type";
import UserRepository from "../repositories/mongoose/mongoose.user.repository";

const router = Router();
const UserModel = new UserRepository(); // TODO: could make use of DI and avoid changing repositories all over the place

router.get("/user/:username", async (req, res, next) => {
  let user: User;
  // Authenticate user token
  if ((await validateToken(req.header("authorization"))) === null) {
    res.sendStatus(401);
    return;
  }
  try {
    // Find user record in the database
    user = await UserModel.findOne({
      username: req.params.username
    });
  } catch (e) {
    next(e);
  }

  if (user != null) {
    // Removing password and token from the response
    delete user.password;
    delete user.token;

    res.send(user);
  } else res.sendStatus(404);
});

router.put("/user/chats", async (req, res, next) => {
  // Authenticate user token
  if ((await validateToken(req.header("authorization"))) === null) {
    res.sendStatus(401);
    return;
  }

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

router.post("/login", async (req, res, next) => {
  const { identifier } = req.body;

  let authUser: User;
  try {
    // Find user record in the database
    authUser = await UserModel.findOne(<User>{
      [identifier.includes("@") ? "email" : "username"]: identifier
    });
  } catch (e) {
    next(e);
  }

  if (authUser != null && authUser.password === req.body.password) {
    // Generate a random session token for the authenticated user
    const token = await generateToken();
    // Save token in the database
    await UserModel.updateOne(
      <User>{ [identifier.includes("@") ? "email" : "username"]: identifier },
      <User>{ token },
      UpdateType.SET
    );

    // Removing password from the results
    delete authUser.password;

    res.send({
      message: "Login successful!",
      user: <User>{
        ...authUser,
        token
      }
    });
  } else res.send({ message: "Error: Username/Password mismatch" });
});

router.post("/register", async (req, res, next) => {
  // Authenticate user token
  if ((await validateToken(req.header("authorization"))) === null) {
    res.sendStatus(401);
    return;
  }

  try {
    const user: User = await UserModel.create({
      ...req.body,
      token: await generateToken()
    });
    // Removing password from the result
    delete user.password;

    res.send({
      message: "Registered successfully!",
      user
    });
  } catch (e) {
    next(e);
  }
});

async function generateToken(): Promise<string> {
  const randomBytes = util.promisify(randomBytesCB);
  return (await randomBytes(48)).toString("hex");
}

async function validateToken(token: string): Promise<User> {
  const user = await UserModel.findOne({ token });
  return user;
}

export default router;

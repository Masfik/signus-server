import * as express from "express";
import UserModel from "../models/user-model";

const router = express.Router();

router.get("/user", async (req, res, next) => {
  // Find user record in the database
  const user = await UserModel.findOne(req.query).catch(next);

  res.send(user);
});

router.put("/user/chats", async (req, res, next) => {
  await UserModel.updateOne(
    { username: req.body.username },
    {
      $push: { "chats.recipient": req.body.recipient }
    }
  ).catch(next);
  const user = await UserModel.findOne({ username: req.body.username });

  res.send(user);
});

router.get("/login", async (req, res, next) => {
  const user = req.body.username;
  // Find user record in the database
  const authUser = await UserModel.findOne({
    username: user
  }).catch(next);

  if (authUser["password"] === req.body.password) {
    // Generate a random session token for the authenticated user
    require("crypto").randomBytes(48, async (err, buffer) => {
      if (err) throw err;
      const token = await buffer.toString("hex");
      // Save token in mongodb
      await UserModel.updateOne(
        { username: user },
        {
          $set: { token: token }
        }
      );

      res.send({
        message: "Login successful!",
        _id: authUser["_id"],
        username: authUser["username"],
        firstName: authUser["firstName"],
        lastName: authUser["lastName"],
        email: authUser["email"],
        chats: authUser["chats"],
        token: token
      });
    });
  } else res.send({ message: "Error: Username/Password mismatch" });
});

router.post("/register", async (req, res, next) => {
  const user = await UserModel.create(req.body).catch(next);
  res.send(user);
});

export default router;

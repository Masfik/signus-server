import * as express from "express";
import UserModel from "../models/user-model";

const router = express.Router();

router.get("/user", (req, res) => {
  res.send({ type: "GET" });
});

router.get("/login", (req, res) => {
  console.log(req.body);
  res.send({
    type: "POST",
    code: 200,
    message: "successful"
  });
});

router.post("/register", async (req, res) => {
  const user = await UserModel.create(req.body);
  res.send(user);
});

export default router;

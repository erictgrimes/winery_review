import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByUsername, getUserById, deleteUser } from "../db/queries/users.js";
import { getReviewsByUserId } from "../db/queries/reviews.js";
import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";
import { createToken } from "../utils/jwt.js";

router
  .route("/register")
  .post(requireBody(["username", "email", "password"]), async (req, res) => {
    const { username, email, password } = req.body;
    const user = await createUser(username, email, password);

    const token = await createToken({ id: user.id });
    res.status(201).json({token});
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsername(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    const token = await createToken({ id: user.id });
    res.status(200).json({token});
  });

router.use(requireUser);

router.route("/me")
  .get(async (req, res) => {
    const user = await getUserById(req.user.id);
    res.json(user);
  })
  .delete(async (req, res) => {
    await deleteUser(req.user.id);
    res.sendStatus(204);
  });


router.route("/:id/reviews").get(async (req, res) => {
  const reviews = await getReviewsByUserId(req.user.id);
  res.send(reviews);
});

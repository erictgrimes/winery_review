import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByUsername } from "#db/queries/users";
import requireBody from "#server/middleware/requireBody";
import requireUser from "#server/middleware/requireUser";
import { createToken } from "#server/utils/jwt";

router
  .route("/register")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);

    const token = await createToken({ id: user.id });
    res.status(201).send(token);
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsername(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    const token = await createToken({ id: user.id });
    res.send(token);
  });

router.use(requireUser);

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).send("User not found.");
    res.send(user);
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    await deleteUser(id);
    res.sendStatus(204);
  });

router.route("/:id/reviews").get(async (req, res) => {
  const { id } = req.params;
  const reviews = await getReviewsByUserId(id);
  res.send(reviews);
});

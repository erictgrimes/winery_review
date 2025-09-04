import express from "express";
const router = express.Router();
export default router;

import requireBody from "#server/middleware/requireBody";
import requireUser from "#server/middleware/requireUser";

import {
  getAllReviews,
  getReviewById,
  getReviewByWineryId,
  addReview,
  deleteReview,
  updateReview,
  getReviewsByUserId,
} from "#db/queries/reviews.js";

router.route("/").get(async (req, res) => {
  const reviews = await getAllReviews();
  res.send(reviews);
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const review = await getReviewById(id);
  if (!review) return res.status(404).send("Review not found.");
  res.send(review);
});

router.use(requireUser);

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  await deleteReview(id, userId);
  res.status(204).send();
});

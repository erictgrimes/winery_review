import express from "express";
const router = express.Router();
export default router;

import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";

import {
  getAllReviews,
  getReviewById,
  getReviewsByWineryId,
  addReview,
  deleteReview,
  updateReview,
  getReviewsByUserId,
} from "../db/queries/reviews.js";

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

  try {
    const deletedReview = await deleteReview(id, userId);
    if (!deletedReview) return res.status(403).send("You cannot delete this review.");
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting review.");
  }
});

import express from "express";
const router = express.Router();
export default router;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

import {
  getAllReviews,
  getReviewById,
  getReviewByWineryId,
  addReview,
  deleteReview,
  updateReview,
  getReviewsByUserId,
} from "#db/queries/reviews";

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

router
  .route("/:id/reviews")
  .post(requireBody([""]), async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await addReview(id, rating, comment);
    res.status(201).send(review);
  });

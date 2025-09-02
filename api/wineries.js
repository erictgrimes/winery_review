import express from "express";
const router = express.Router();
export default router;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

import {
  getAllWineries,
  getWineryById,
  addWinery,
  approveWinery,
  deleteWinery,
} from "#db/queries/wineries.js";

import {
  addReview,
  deleteReview,
  updateReview,
  getReviewById,
  getReviewByWineryId,
  getReviewsByUserId,
} from "#db/queries/reviews.js";

router.route("/").get(async (req, res) => {
  const wineries = await getAllWineries();
  res.send(wineries);
});

router.route("/:id").get(async (req, res) => {
  const winery = await getWineryById(req.params.id);
  res.send(winery);
});

router.route("/:id/reviews").get(async (req, res) => {
  const reviews = await getReviewByWineryId(req.params.id);
  res.send(reviews);
});

router.use(requireUser);

router
  .route("/")
  .post(requireBody("name", "address", "photo"), async (req, res) => {
    const { name, address, photo } = req.body;
    const winery = await addWinery({ name, address, photo });
    res.status(201).send(winery);
  });

router
  .route("/:id/reviews")
  .post(
    requireBody("venue", "variety", "pricing", "staff", "review_text"),
    async (req, res) => {
      const userId = req.user.id;
      const wineryId = req.params.id;
      const { venue, variety, pricing, staff, overall, review_text } = req.body;
      const review = await addReview({
        winery_id: wineryId,
        user_id: userId,
        venue,
        variety,
        pricing,
        staff,
        overall,
        review_text,
      });
      res.status(201).send(review);
    }
  );

router.route("").delete(async (req, res) => {
  await deleteReview(req.params.id, req.body.userId);
  res.status(204).send();
});

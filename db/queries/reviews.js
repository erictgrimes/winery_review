import db from "#db/client";
import bcrypt from "bcrypt";

export async function getAllReviews() {
  const sql = `
    select * from reviews`;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getReviewById(id) {
  const sql = `
    SELECT * FROM reviews WHERE id = $1`;
  const {
    rows: [review],
  } = await db.query(sql, [id]);
  return review;
}
export async function getReviewByWineryId(winery_id) {
  const sql = `
    SELECT * FROM reviews WHERE winery_id = $1`;
  const { rows } = await db.query(sql, [winery_id]);
  return rows;
}

//authorized user here

export async function addReview(reviewData) {
  const sql = `
    INSERT INTO reviews (winery_id, user_id, venue, variety, price, staff, overall, review_text)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;
  const {
    rows: [review],
  } = await db.query(sql, [
    reviewData.winery_id,
    reviewData.user_id,
    reviewData.venue,
    reviewData.variety,
    reviewData.price,
    reviewData.staff,
    reviewData.overall,
    reviewData.review_text,
  ]);
  return review;
}

export async function deleteReview(id) {
  const sql = `
    DELETE FROM reviews WHERE id = $1
    RETURNING *`;
  const {
    rows: [review],
  } = await db.query(sql, [id]);
  return review;
}


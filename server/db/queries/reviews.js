import db from "#server/db/client";
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

//authorized user here

export async function addReview(reviewData) {
  const sql = `
    INSERT INTO reviews (winery_id, user_id, venue, variety, pricing, staff, overall, review_text)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;
  const {
    rows: [review],
  } = await db.query(sql, [
    reviewData.winery_id,
    reviewData.user_id,
    reviewData.venue,
    reviewData.variety,
    reviewData.pricing,
    reviewData.staff,
    reviewData.overall,
    reviewData.review_text,
  ]);
  return review;
}

export async function updateReview(id, reviewData) {
    const sql = `
    UPDATE reviews
    SET winery_id = $1, user_id = $2, venue = $3, variety = $4, pricing = $5, staff = $6, overall = $7, review_text = $8
    WHERE id = $9
    RETURNING *`;
  const {
    rows: [review],
  } = await db.query(sql, [
    reviewData.winery_id,
    reviewData.user_id,
    reviewData.venue,
    reviewData.variety,
    reviewData.pricing,
    reviewData.staff,
    reviewData.overall,
    reviewData.review_text,
    id,
  ]);
  return review;
}

export async function getReviewsByUserId(user_id) {
  const sql = `
    SELECT r.*, w.name AS winery_name, w.photo AS winery_photo
    FROM reviews r
    JOIN wineries w ON r.winery_id = w.id
    WHERE r.user_id = $1
    ORDER BY r.date DESC
  `;
  const { rows } = await db.query(sql, [user_id]);
  return rows;
}
export async function getReviewsByWineryId(winery_id) {
    const sql = `SELECT r.*, u.username
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.winery_id = $1
    ORDER BY r.date DESC
    `;
    const { rows } = await db.query(sql, [winery_id]);
    return rows;
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


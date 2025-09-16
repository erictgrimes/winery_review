import db from "#server/db/client";
import bcrypt from "bcrypt";

export async function getAllWineries() {
  const sql = `
    SELECT * FROM wineries `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getWineryById(id) {
  const sql = `
    SELECT * FROM wineries WHERE id = $1`;
  const {
    rows: [winery],
  } = await db.query(sql, [id]);
  return winery;
}

// picking 3 random wineries for the home page
export async function getRandomWineries() {
  const sql = `
    SELECT 
      w.id,
      w.name,
      w.address,
      w.photo,
      ROUND(AVG(r.overall), 1) AS avg_rating,
      COUNT(r.id) AS review_count
    FROM wineries w
    LEFT JOIN reviews r ON r.winery_id = w.id
    WHERE w.is_approved = true
    GROUP BY w.id
    ORDER BY RANDOM()
    LIMIT 3;
  `;
  const { rows } = await db.query(sql);
  return rows;
}

//authorize user here

export async function addWinery(wineryData) {
  const sql = `
    INSERT INTO wineries (name, address, photo)
    VALUES ($1, $2, $3) RETURNING *`;
  const {
    rows: [winery],
  } = await db.query(sql, [
    wineryData.name,
    wineryData.address,
    wineryData.photo,
  ]);
  return winery;
}

//admin user here

export async function approveWinery(id) {
  const sql = `
    UPDATE wineries SET is_appoved = TRUE
    WHERE id = $1 RETURNING *`;
  const {
    rows: [winery],
  } = await db.query(sql, [id]);
  return winery;
}

export async function deleteWinery(id) {
  const sql = `
    DELETE FROM wineries WHERE id = $1 RETURNING *`;
  const {
    rows: [winery],
  } = await db.query(sql, [id]);
  return winery;
}

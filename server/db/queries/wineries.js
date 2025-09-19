import db from "#server/db/client";
import bcrypt from "bcrypt";

export async function getAllWineries() {
  const sql = `
  SELECT w.*, 
  COALESCE(AVG(r.venue), 0) as avg_venue,
  COALESCE(AVG(r.variety), 0) as avg_variety,
  COALESCE(AVG(r.pricing), 0) as avg_pricing,
  COALESCE(AVG(r.staff), 0) as avg_staff,
  COALESCE(AVG(r.overall), 0) as avg_overall,
  COUNT(r.id) as review_count
  FROM wineries w
  LEFT JOIN reviews r ON w.id = r.winery_id
  GROUP BY w.id
  ORDER BY w.name;`
  const { rows } = await db.query(sql);
  return rows;
}

export async function getWineryById(id) {
  const sql = `
  SELECT w.*, 
  COALESCE(AVG(r.venue), 0) as avg_venue,
  COALESCE(AVG(r.variety), 0) as avg_variety,
  COALESCE(AVG(r.pricing), 0) as avg_pricing,
  COALESCE(AVG(r.staff), 0) as avg_staff,
  COALESCE(AVG(r.overall), 0) as avg_overall,
  COUNT(r.id) as review_count
  FROM wineries w
  LEFT JOIN reviews r ON w.id = r.winery_id
  WHERE w.id = $1
  GROUP BY w.id;`;
  const { rows: winery } = await db.query(sql, [id]);
  return winery;
}

// picking 3 random wineries for the home page
export async function getRandomWineries() {
  const sql = `
    SELECT 
      w.id,
      w.name,
      w.city,
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
    INSERT INTO wineries (name, address, city, state, photo, is_approved)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const {
    rows: [winery],
  } = await db.query(sql, [
    wineryData.name,
    wineryData.address,
    wineryData.city,
    wineryData.state,
    wineryData.photo,
    wineryData.is_approved ?? false,
  ]);
  return winery;
}

//admin user here

export async function approveWinery(id) {
  const sql = `
    UPDATE wineries SET is_approved = TRUE
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

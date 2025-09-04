import db from "#server.db/client";
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

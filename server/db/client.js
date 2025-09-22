import pkg from "pg";
const { Pool } = pkg;

const isProduction = process.env.DATABASE_URL && process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false } 
    : false 
});

export default pool;
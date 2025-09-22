import pg from "pg";

const options = { connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized:false,
    },
 };


const db = new pg.Client(options);
export default db;

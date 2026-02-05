import mysql from "mysql2/promise";
import env from "./env.js";

export const db = mysql.createPool({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export default db;

import mysql2 from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();
interface proccsesEnv {
  DB_HOST?: string;
  DB_NAME?: string;
  DB_PASSWORD?: string;
  DB_PORT?: number;
}
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env as proccsesEnv;

const connection = mysql2.createPool({
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
  user: DB_NAME,
  port: DB_PORT,
});
export default connection;

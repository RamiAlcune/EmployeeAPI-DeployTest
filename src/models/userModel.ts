import { ResultSetHeader } from "mysql2";
import connection from "../utils/database";

export interface User {
  id?: number;
  username: string;
  password: string;
}

export const getUserByUserName = async (username: string): Promise<User | null> => {
  const [rows]: any = await connection.query("SELECT * FROM Users WHERE username = ?", [username]);
  return rows[0] || null;
};

export const createUser = async (user: User): Promise<User> => {
  const [result] = (await connection.query("INSERT INTO Users (username, password) VALUES (?, ?)", [
    user.username,
    user.password,
  ])) as ResultSetHeader[];
  return { id: result.insertId, ...user };
};

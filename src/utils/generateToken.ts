import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userID: number) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is missing");
  }
  if (!process.env.JWT_LIFETIME) {
    throw new Error("JWT_LIFETIME environment variable is missing");
  }

  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};

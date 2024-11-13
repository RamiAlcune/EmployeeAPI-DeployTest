import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: { userID: number };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).json({ message: "Access token is missing", status: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userID: number };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid access token", status: false });
  }
};

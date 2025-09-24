import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token

  if (!token) return res.status(403).json({ error: "Access denied, token missing!" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // attach decoded user info to req
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};






//response => token nhi
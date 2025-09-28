import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { decryptToken } from "../tokenEncrypt";
import { pool } from "../db";
const JWT_SECRET = process.env.JWT_SECRET as string;
import  { MyJwtPayload }  from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
 // const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token
const token = req.cookies.jwt;
console.log("Token from cookie:", token);
  if (!token) return res.status(403).json({ error: "Access denied, token missing!" });
  try {
   // const decoded = jwt.verify(token, JWT_SECRET);
      const decoded = await decryptToken(token) as MyJwtPayload

   if(!decoded) {
    return res.status(401).json({ error: "not decoded" });
   }
   console.log("Decoded Token:", decoded.username);
   
   const result = await pool.query("SELECT role FROM adminusers WHERE username = $1", [decoded.username]);

   console.log("User Role Query Result:", result);
   req.user = result.rows[0];
// (req as any).user = decoded; // attach decoded user info to req
    next();
  }
   catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
  } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
  } else {
    return res.status(401).json({ error: "Authorization error" });
  }
  }
};






//response => token nhi
// src/controllers/authController.ts
import { Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;

// handlelogin
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // console.log("Username and Password",username,password)
  console.log("req.body:", req.body);

  try {
    const result = await pool.query("SELECT * FROM adminusers WHERE username = $1", [username]);

     console.log("Auth COntroller",result)
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
     return res.status(401).json({ error: "Invalid  password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login successful", token ,
      success : true 
    });
    
  } catch (err) {
    console.error("Pool doesnt exixt",err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

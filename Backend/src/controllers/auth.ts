// src/controllers/authController.ts
import { Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {encryptToken} from "../tokenEncrypt";

const JWT_SECRET = process.env.JWT_SECRET as string;

// handlelogin
// create login account
export const login = async (req: Request<{},{}>, res: Response<{error: string; message:string}| 
  {token:string;  success: boolean; message:string} |{success: boolean; message:string}>) => {
  const { username, password } = req.body;
  // console.log("Username and Password",username,password)
  console.log("req.body:", req.body);
  
  try {
    const result = await pool.query("SELECT * FROM adminusers WHERE username = $1", [username]);

     console.log("Auth Controller",result)
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password", message: "Invalid username or password" });
    }
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
     return res.status(401).json({ error: "Invalid  password", message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username as string }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("jwt sign Token:", token);
    const encrypt = encryptToken(token);
    console.log("Encrypted Token:", encrypt);
     res.cookie('jwt', encrypt, {
            httpOnly: true,
            maxAge: 3600000,
            secure:false
     }); // 1 hour
    res .status(200)
        .json({ message: 'Logged in successfully',
           success : true
         });
   
  } catch (err) {
    console.error("Pool doesnt exist",err);
    res.status(500).json({ error: "Something went wrong", message: "Something went wrong" });
  }
};

export const logout = async (req: Request ,res:Response) =>{
  res.clearCookie('jwt');
  return res.status(200).json({message:"logout successfully"})
}

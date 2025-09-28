import express from "express";
import { login, logout } from "../controllers/auth";
import { adminValidation } from "../middleware/adminValidation";

import { verifyToken } from "../middleware/auth";
const router = express.Router();

// Login route
router.post("/login", login);
// logout route
router.post("/logout", logout);
export default router;

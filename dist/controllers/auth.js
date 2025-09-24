"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
// handlelogin
const login = async (req, res) => {
    const { username, password } = req.body;
    // console.log("Username and Password",username,password)
    console.log("req.body:", req.body);
    try {
        const result = await db_1.pool.query("SELECT * FROM adminusers WHERE username = $1", [username]);
        console.log("Auth COntroller", result);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const user = result.rows[0];
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid  password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: "24h",
        });
        res.status(200).json({ message: "Login successful", token,
            success: true
        });
    }
    catch (err) {
        console.error("Pool doesnt exixt", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};
exports.login = login;
//# sourceMappingURL=auth.js.map
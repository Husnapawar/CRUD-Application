"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
async function createAdmin() {
    const username = "admin1";
    const plainPassword = "12345";
    const hashedPassword = await bcrypt_1.default.hash(plainPassword, 10);
    await db_1.pool.query("INSERT INTO adminusers (username, password) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING", [username, hashedPassword]);
    console.log("Admin user created with username:", username, "password:", plainPassword);
    process.exit(0);
}
createAdmin().catch(console.error);
//# sourceMappingURL=createAdmin.js.map
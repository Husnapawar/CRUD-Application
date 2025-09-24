import bcrypt from "bcrypt";
import { pool } from "./db";

async function createAdmin() {
  const username = "admin1";
  const plainPassword = "12345";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await pool.query(
    "INSERT INTO adminusers (username, password) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING",
    [username, hashedPassword]
  );

  console.log("Admin user created with username:", username, "password:", plainPassword);
  process.exit(0);
}

createAdmin().catch(console.error);

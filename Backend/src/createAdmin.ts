import bcrypt from "bcrypt";
import { pool } from "./db";

async function createAdmin() {
  const username = "user";
  const plainPassword = "pass123";
  const role = "user";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await pool.query(
    "INSERT INTO adminusers (username, password, role) VALUES ($1, $2,$3)",
    [username, hashedPassword, role]
  );

  console.log("Admin user created with username:", username, "password:", plainPassword);
  process.exit(0);
}

createAdmin().catch(console.error);

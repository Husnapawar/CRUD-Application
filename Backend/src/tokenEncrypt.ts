import crypto from "crypto";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET || 'my_secret_key';
const ALGO = "aes-256-gcm";
const SECRET = crypto.scryptSync(SECRET_KEY as string, "salt", 32);

export function encryptToken(token: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, SECRET , iv);

  const encrypted = Buffer.concat([cipher.update(token as string, "utf-8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, encrypted]).toString("base64url");
}

export async function decryptToken(encrypted: string) {
  const buf = Buffer.from(encrypted, "base64url");

  const iv = buf.subarray(0, 16);
  const authTag = buf.subarray(16, 32);
  const encryptedData = buf.subarray(32);

  const decipher = crypto.createDecipheriv(ALGO, SECRET, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

  const res = await jwt.verify(decrypted.toString("utf-8"), process.env.JWT_SECRET as string);
  console.log("Decrypted and verified token:", res);
  return res;
}
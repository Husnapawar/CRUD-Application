import express from "express";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import { verifyToken } from "./middleware/auth";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
const PORT = 3000;

app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //  for form-data

// Public login route
app.use("/api/auth", authRoutes);

app.use(cors({
  credentials: true,
}))

// Protect all user CRUD routes
app.use("/api/users", verifyToken, userRoutes);

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
 
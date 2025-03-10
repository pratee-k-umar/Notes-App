import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => {
  console.log(err)
  process.exit(1)
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(5000, () => console.log("Server running on port 5000"))
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   console.log("ROOT HIT 🔥");
//   res.send("Hello from backend");
// });

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

export default app;

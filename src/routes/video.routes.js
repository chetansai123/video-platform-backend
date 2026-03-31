import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/rbac.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadVideo } from "../controllers/video.controller.js";
import express from "express";

const router = express.Router();

// router.get("/public", (req, res) => {
//   res.send("public route");
// });

// router.get("/protected", protect, (req, res) => {
//   console.log("Protected route hit, user:", req.user);
//   res.json({
//     message: "You are authenticated",
//     user: req.user,
//   });
// });

// router.get("/admin", protect, authorize("admin"), (req, res) => {
//   res.send("Admin only route");
// });

router.post(
  "/upload",
  protect,
  authorize("admin", "editor"),
  upload.single("video"), // field name = "video"
  uploadVideo,
);

export default router;

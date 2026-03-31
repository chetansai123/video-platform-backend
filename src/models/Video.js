import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: String,

    filePath: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "ready", "failed"],
      default: "uploaded",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    progress: {
      type: Number,
      default: 0,
    },
    result: {
      type: String,
      enum: ["safe", "sensitive", "flagged"],
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Video", videoSchema);

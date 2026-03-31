import Video from "../models/Video.js";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";

const waitForFileStability = async (filePath, retries = 5, delay = 1000) => {
  let lastSize = 0;

  for (let i = 0; i < retries; i++) {
    if (!fs.existsSync(filePath)) {
      console.log("File not found yet...");
      await new Promise((res) => setTimeout(res, delay));
      continue;
    }

    const currentSize = fs.statSync(filePath).size;
    console.log(`File size check [${i}]:`, currentSize);

    if (currentSize === lastSize && currentSize > 0) {
      console.log("File is stable ");
      return true;
    }

    lastSize = currentSize;
    await new Promise((res) => setTimeout(res, delay));
  }

  return false;
};

export const processVideo = async (video) => {
  const videoId = video._id;

  const inputPath = path.resolve(video.filePath);

  console.log("Starting processing for video:", videoId);
  console.log("Resolved path:", inputPath);

  try {
    if (!fs.existsSync(inputPath)) {
      console.log("File does not exist ");

      await Video.findByIdAndUpdate(videoId, {
        status: "failed",
        progress: 0,
      });

      return;
    }

    const isStable = await waitForFileStability(inputPath);

    if (!isStable) {
      console.log("File not stable, aborting");

      await Video.findByIdAndUpdate(videoId, {
        status: "failed",
        progress: 0,
      });

      return;
    }

    await Video.findByIdAndUpdate(videoId, {
      status: "processing",
      progress: 10,
    });

    // simulate progress
    setTimeout(() => {
      Video.findByIdAndUpdate(videoId, { progress: 40 });
    }, 1000);

    setTimeout(() => {
      Video.findByIdAndUpdate(videoId, { progress: 70 });
    }, 2000);

    //  prepare thumbnail
    const thumbnailName = `${Date.now()}-thumb.png`;
    const thumbnailFolder = path.resolve("uploads/thumbnails");

    if (!fs.existsSync(thumbnailFolder)) {
      fs.mkdirSync(thumbnailFolder, { recursive: true });
    }

    const thumbnailPath = path.join(thumbnailFolder, thumbnailName);

    ffmpeg(inputPath)
      .on("start", (cmd) => {
        console.log("FFmpeg started:", cmd);
      })
      .on("end", async () => {
        console.log("Thumbnail generated successfully ");

        const results = ["safe", "sensitive", "flagged"];
        const result = results[Math.floor(Math.random() * results.length)];

        await Video.findByIdAndUpdate(videoId, {
          status: "ready",
          progress: 100,
          thumbnail: `uploads/thumbnails/${thumbnailName}`, // store relative path
          result,
        });

        console.log("Processing completed : ", videoId);
      })
      .on("error", async (err) => {
        console.log("FFmpeg error:", err.message);

        await Video.findByIdAndUpdate(videoId, {
          status: "failed",
          progress: 0,
        });
      })
      .outputOptions("-ss 00:00:01")
      .frames(1)
      .output(thumbnailPath)
      .run();
  } catch (error) {
    console.log("Processing error :", error.message);

    await Video.findByIdAndUpdate(videoId, {
      status: "failed",
      progress: 0,
    });
  }
};

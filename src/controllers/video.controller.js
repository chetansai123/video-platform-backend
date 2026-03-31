import { createVideo } from "../services/video.service.js";

export const uploadVideo = async (req, res, next) => {
  try {
    const video = await createVideo({
      file: req.file,
      user: req.user,
      title: req.body.title,
    });
    res.status(201).json({
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    next(error);
  }
};

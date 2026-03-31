import Video from "../models/Video.js";
import { processVideo } from "./processing.service.js";

export const createVideo = async ({ file, user, title }) => {
  if (!file) {
    throw new Error("No file uploaded");
  }
  const video = await Video.create({
    title: title || file.originalname,
    filePath: file.path,
    uploadedBy: user._id,
    organisationId: user.organizationId,
    status: "uploaded",
    progress: 0,
  });
  processVideo(video); // triggering process - async so we need not wait for it to complete here
  return video;
};

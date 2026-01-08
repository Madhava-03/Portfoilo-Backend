import Content from "../models/contentModel.js";
import catchAsync from "../utilis/catchAsync.js";
import AppError from "../utilis/appError.js";
import { uploadToCloudinary } from "../utilis/cloudinaryUpload.js";

// export const createContent = catchAsync(async (req, res, next) => {
//   console.log("✅ Controller entered");
//   const { type, caption } = req.body;

//   if (!type || !req.files || req.files.length === 0)
//     return next(new AppError("Media and type are required", 400));

//   console.log("Controller Hit");

//   const media = req.files.map((file) => ({
//     url: file.path,
//     mediaType: file.mimetype.startsWith("video") ? "video" : "image",
//   }));

//   const contentData = {
//     type,
//     caption,
//     media,
//   };

//   if (contentData.type == "story") {
//     contentData.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
//   }

//   const content = await Content.create(contentData);

//   res.status(201).json({
//     status: "success",
//     data: content,
//   });
// });

export const createContent = catchAsync(async (req, res, next) => {
  console.log("✅ Controller entered");

  const { type, caption } = req.body;

  if (!type || !req.files || req.files.length === 0) {
    return next(new AppError("Media and type are required", 400));
  }

  // ⬆️ Upload each file buffer to Cloudinary
  const uploads = await Promise.all(
    req.files.map((file) =>
      uploadToCloudinary(file.buffer, {
        folder: "social-content",
        resource_type: "auto",
      })
    )
  );

  // ⬆️ Build media array from Cloudinary response
  const media = uploads.map((upload) => ({
    url: upload.secure_url,
    mediaType: upload.resource_type, // image | video
  }));

  const contentData = {
    type,
    caption,
    media,
  };

  if (type === "story") {
    contentData.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  }

  const content = await Content.create(contentData);

  res.status(201).json({
    status: "success",
    data: content,
  });
});

export const deleteContent = catchAsync(async (req, res, next) => {
  const content = await Content.findByIdAndDelete(req.params.id);

  if (!content) return next(new AppError("Content not found", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const updateContent = catchAsync(async (req, res, next) => {
  const allowedFields = ["caption", "media"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const content = await Content.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!content) return next(new AppError("Content not found", 404));

  res.status(200).json({
    status: "success",
    data: content,
  });
});

export const getFeed = catchAsync(async (req, res, next) => {
  const posts = await Content.find({
    type: "post",
    isArchived: { $ne: true },
  }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: posts,
  });
});

export const getActiveStories = catchAsync(async (req, res, next) => {
  const stories = await Content.find({
    type: "story",
    isHighlight: false,
    expiresAt: { $gt: Date.now() },
  }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: stories.length,
    data: stories,
  });
});

export const getHighlights = catchAsync(async (req, res, next) => {
  const highlights = await Content.find({
    type: "story",
    isHighlight: true,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: highlights.length,
    data: highlights,
  });
});

export const highlightStory = catchAsync(async (req, res, next) => {
  const story = await Content.findById(req.params.id);

  if (!story || story.type !== "story") {
    return next(new AppError("Story not found", 404));
  }

  story.isHighlight = true;
  story.expiresAt = null;
  story.isArchived = false;

  await story.save();

  res.status(200).json({ status: "success", data: story });
});

export const unHighlightStory = catchAsync(async (req, res, next) => {
  const story = await Content.findById(req.params.id);

  if (!story || story.type !== "story") {
    return next(new AppError("Story not found", 404));
  }

  story.isHighlight = false;
  story.isArchived = true;
  story.expiresAt = Date.now() - 1000;

  await story.save();

  res.status(200).json({
    status: "success",
    data: story,
  });
});

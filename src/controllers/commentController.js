import Comment from "../models/commentModel.js";
import Content from "../models/contentModel.js";
import catchAsync from "../utilis/catchAsync.js";
import AppError from "../utilis/appError.js";

export const createComment = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const { contentId } = req.params;

  if (!text) {
    return next(new AppError("Comment text is required", 400));
  }

  const content = await Content.findById(contentId);
  if (!content) {
    return next(new AppError("Content not found", 404));
  }

  const comment = await Comment.create({
    content: contentId,
    user: req.user._id,
    text,
  });

  res.status(201).json({
    status: "success",
    data: comment,
  });
});

export const getComments = catchAsync(async (req, res, next) => {
  const { contentId } = req.params;

  const comments = await Comment.find({ content: contentId })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: comments,
  });
});

export const deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  if (
    comment.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new AppError("Not authorized to delete this comment", 403));
  }

  await comment.deleteOne();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

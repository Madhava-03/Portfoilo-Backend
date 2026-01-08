import Blog from "../models/blogModel/blogSchema.js";
import catchAsync from "../utilis/catchAsync.js";
import AppError from "../utilis/appError.js";

export const createBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({
    status: "sucess",
    data: {
      blog,
    },
  });
});

export const getAllBlogs = catchAsync(async (req, res, next) => {
  const { category, page = 1, limit = 10 } = req.query;

  const filter = { isPublic: true };

  if (category) filter.category = category;

  const blogs = await Blog.find(filter)
    .sort({ isPinned: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .select("-__v");

  res.status(200).json({
    status: "sucess",
    results: blogs.length,
    data: blogs,
  });
});

export const getBlogBySlug = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    isPublic: true,
  });

  if (!blog) return next(new AppError("this blog Does not Exist", 404));

  res.status(200).json({
    status: "sucess",
    data: {
      blog,
    },
  });
});

export const getBlogBycategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const blogs = await Blog.find({ category, isPublic: true })
    .sort({ isPinned: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .select("-_v");

  res.status(200).json({
    status: "sucess",
    results: blogs.length,
    data: blogs,
  });
});

export const updateBlog = catchAsync(async (req, res, next) => {
  // console.log("PATCH ID:", req.params.id);
  // console.log("PATCH BODY:", req.body);
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blog) return next(new AppError("this blog Does not Exist", 404));

  res.status(200).json({
    status: "sucess",
    data: {
      blog,
    },
  });
});

export const deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const togglepin = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  blog.isPinned = !blog.isPinned;
  await blog.save();

  res.status(200).json({
    status: "success",
    data: {
      isPinned: blog.isPinned,
    },
  });
});

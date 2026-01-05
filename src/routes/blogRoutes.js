import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

router.use(protect, restrictTo("admin"));

router.post("/", createBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;

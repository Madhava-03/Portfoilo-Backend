import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getBlogBycategory,
} from "../controllers/blogController.js";

import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getAllBlogs);

router.get(
  "/tech",
  (req, res, next) => {
    req.params.category = "tech";
    next();
  },
  getBlogBycategory
);

router.get(
  "/life",
  (req, res, next) => {
    req.params.category = "life";
    next();
  },
  getBlogBycategory
);

router.get(
  "/weekly",
  (req, res, next) => {
    req.params.category = "weekly";
    next();
  },
  getBlogBycategory
);
router.get("/:slug", getBlogBySlug);
router.use(protect, restrictTo("admin"));

router.post("/", createBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;

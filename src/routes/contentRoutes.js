import { Router } from "express";
import upload from "../middlewares/uploadMedia.js";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  createContent,
  deleteContent,
  updateContent,
  getFeed,
  getHighlights,
  getActiveStories,
  unHighlightStory,
  highlightStory,
} from "../controllers/contentController.js";

const router = Router();

router.use(protect);

router.get("/feed", getFeed);
router.get("/stories", getActiveStories);
router.get("/highlights", getHighlights);

router.use(restrictTo("admin"));

router.post("/", upload.array("media", 5), createContent);
router.patch("/:id", upload.array("media", 5), updateContent);
router.delete("/:id", deleteContent);

router.patch("/:id/highlight", highlightStory);
router.patch("/:id/unhighlight", unHighlightStory);

export default router;

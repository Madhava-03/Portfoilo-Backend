import { Router } from "express";
import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../controllers/authController.js";

const router = Router();

router.use(protect);

router.get("/:contentId", getComments);
router.post("/:contentId", createComment);
router.delete("/:id", deleteComment);

export default router;

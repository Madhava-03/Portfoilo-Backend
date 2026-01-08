import { Router } from "express";
import {
  getSocialMedia,
  upsertSocialMedia,
  deleteSocialMedia,
} from "../controllers/socialProfileController.js";

const router = Router();

import { restrictTo, protect } from "../controllers/authController.js";

router.get("/", getSocialMedia);

router.use(protect, restrictTo("admin"));
router.patch("/", upsertSocialMedia);
router.post("/", upsertSocialMedia);
router.delete("/", deleteSocialMedia);

export default router;

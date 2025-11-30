import express from "express";
import {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
  addAchievement,
  addExperience,
  addEducation,
  addExtracurricular,
  addHobby,
  addLanguage,
  addProject,
  addSkill,
  updateSkill,
  updateEducation,
  updateExperience,
  updateProject,
  updateAchievement,
  updateExtracurricular,
  updateLanguage,
  updateHobby,
  deleteSkill,
  deleteEducation,
  deleteExperience,
  deleteProject,
  deleteAchievement,
  deleteExtracurricular,
  deleteLanguage,
  deleteHobby,
} from "../controllers/aboutController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// open to public
router.get("/", getAbout);

// only admin

router.post("/", protect, restrictTo("admin"), createAbout);
router.patch("/", protect, restrictTo("admin"), updateAbout);
router.delete("/", protect, restrictTo("admin"), deleteAbout);

// routes for adding specific schemas

router.post("/skills", protect, restrictTo("admin"), addSkill);
router.post("/education", protect, restrictTo("admin"), addEducation);
router.post("/experience", protect, restrictTo("admin"), addExperience);
router.post("/projects", protect, restrictTo("admin"), addProject);
router.post("/achievements", protect, restrictTo("admin"), addAchievement);
router.post(
  "/extracurriculars",
  protect,
  restrictTo("admin"),
  addExtracurricular
);
router.post("/languages", protect, restrictTo("admin"), addLanguage);
router.post("/hobbies", protect, restrictTo("admin"), addHobby);

// routes for updating specific tasks

router.patch("/skills/:id", protect, restrictTo("admin"), updateSkill);
router.patch("/education/:id", protect, restrictTo("admin"), updateEducation);
router.patch("/experience/:id", protect, restrictTo("admin"), updateExperience);
router.patch("/projects/:id", protect, restrictTo("admin"), updateProject);
router.patch(
  "/achievements/:id",
  protect,
  restrictTo("admin"),
  updateAchievement
);
router.patch(
  "/extracurriculars/:id",
  protect,
  restrictTo("admin"),
  updateExtracurricular
);
router.patch("/languages/:id", protect, restrictTo("admin"), updateLanguage);
router.patch("/hobbies/:id", protect, restrictTo("admin"), updateHobby);

//routes for deleting subdocs/:id

router.delete("/skills/:id", protect, restrictTo("admin"), deleteSkill);
router.delete("/education/:id", protect, restrictTo("admin"), deleteEducation);
router.delete(
  "/experience/:id",
  protect,
  restrictTo("admin"),
  deleteExperience
);
router.delete("/projects/:id", protect, restrictTo("admin"), deleteProject);
router.delete(
  "/achievements/:id",
  protect,
  restrictTo("admin"),
  deleteAchievement
);
router.delete(
  "/extracurriculars/:id",
  protect,
  restrictTo("admin"),
  deleteExtracurricular
);
router.delete("/languages/:id", protect, restrictTo("admin"), deleteLanguage);
router.delete("/hobbies/:id", protect, restrictTo("admin"), deleteHobby);

export default router;

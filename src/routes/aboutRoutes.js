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

router.post("/skills", addSkill);
router.post("/education", addEducation);
router.post("/experience", addExperience);
router.post("/projects", addProject);
router.post("/achievements", addAchievement);
router.post("/extracurriculars", addExtracurricular);
router.post("/languages", addLanguage);
router.post("/hobbies", addHobby);

// routes for updating specific tasks

router.patch("/skills/:id", updateSkill);
router.patch("/education/:id", updateEducation);
router.patch("/experience/:id", updateExperience);
router.patch("/projects/:id", updateProject);
router.patch("/achievements/:id", updateAchievement);
router.patch("/extracurriculars/:id", updateExtracurricular);
router.patch("/languages/:id", updateLanguage);
router.patch("/hobbies/:id", updateHobby);

//routes for deleting subdocs/:id

router.delete("/skills/:id", deleteSkill);
router.delete("/education/:id", deleteEducation);
router.delete("/experience/:id", deleteExperience);
router.delete("/projects/:id", deleteProject);
router.delete("/achievements/:id", deleteAchievement);
router.delete("/extracurriculars/:id", deleteExtracurricular);
router.delete("/languages/:id", deleteLanguage);
router.delete("/hobbies/:id", deleteHobby);

export default router;

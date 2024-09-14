import express from "express";
import {
  createProject,
  deleteProject,
  getFeaturedProjects,
  getProjects,
  updateProject,
} from "../controllers/projectContoller.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/featured", getFeaturedProjects);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;

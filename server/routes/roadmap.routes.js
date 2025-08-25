import { Router } from "express";
import { createRoadmap } from "../controllers/roadmap.controller.js";
import { getRoadmapById } from "../controllers/roadmap.controller.js";

const router = Router();

router.post("/createRoadMap", createRoadmap);
router.get("/:id",getRoadmapById);

export default router;

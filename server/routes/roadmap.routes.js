import { Router } from "express";
import { getRoadmap } from "../controllers/roadmap.controller.js";

const router = Router();

router.post("/getRoadMap", getRoadmap);

export default router;
import { Router } from "express";
import { createLevelContent } from "../controllers/content.controller.js";
const router=Router();
router.post("/createLevelContent",createLevelContent)


export default router;
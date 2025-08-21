import {Router} from "express";
import {getAssessmentQuestions,evaluateAssessment} from "../controllers/assesment.controller.js";


const router=Router();

router.post("/questions",getAssessmentQuestions);
router.post("/evaluate",evaluateAssessment);

export default router;


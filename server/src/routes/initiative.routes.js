import { Router } from "express";
import { verifyJWT } from "../controllers/auth.controller.js";
import { createInitiative } from "../controllers/initiative.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router()

//1. CREATE INITIATIVE
router.post('/create-initiative', verifyJWT, upload.single("banner"), createInitiative)

export default router
import { Router } from "express";
import { verifyJWT } from "../controllers/auth.controller.js";
import { regiterInitiative, totalRegisteredEvents } from "../controllers/volunteer.contoller.js";

const router = Router()


router.post('/register-event/:eventId', verifyJWT, regiterInitiative)

router.get('/all-registered-events', verifyJWT, totalRegisteredEvents)


export default router
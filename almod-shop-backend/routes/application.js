import express from "express";
import { createApplication, readApplication, deleteApplication } from "../controllers/applicationController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

router.post('/createApplication', createApplication);

router.post('/deleteApplication', verifyAdmin, deleteApplication);

router.get('/findApplication', readApplication);

export default router

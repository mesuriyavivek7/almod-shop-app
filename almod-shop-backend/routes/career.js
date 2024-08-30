import express from "express";
import { createCareerPost, deleteCareerPost, readCareerPost, updateCareerPost } from "../controllers/careerController.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router()


//for creating new post
router.post('/careerCreate', verifyAdmin, createCareerPost);


//for updating post
router.post('/editCareerPost', verifyAdmin, updateCareerPost);


//for deleting post
router.post('/deleteCareerPost', verifyAdmin, deleteCareerPost);


//for getting all career post
router.get('/findCareerPost', readCareerPost)

export default router

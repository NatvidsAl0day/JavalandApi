import express from 'express';
import { createReview } from '../controller/reviewsController.js';
import { verifyUSer } from '../utils/verifyToken.js';
const router = express.Router()

router.post('/:tourId', verifyUSer, createReview)

export default router;

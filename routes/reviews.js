import express from 'express';
import { createReview } from '../controller/reviewsController.js';
import { verifyUSer, verifyToken } from '../utils/verifyToken.js';
const router = express.Router()

router.post('/:tourId', verifUSer, createReview)

export default router;

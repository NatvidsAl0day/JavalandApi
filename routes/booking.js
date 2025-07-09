import express from 'express';
import { verifyAdmin, verifyUSer, verifyToken } from '../utils/verifyToken.js';
import { createBooking, getAllBooking, getBooking } from '../controller/bookingController.js';


const router = express.Router()

router.post('/', verifyToken, createBooking)
router.get('/:id', verifyUSer, getBooking)
router.get('/', verifyAdmin, getAllBooking)

export default router;

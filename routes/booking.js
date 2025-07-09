import express from 'express';
import { verifyAdmin, verifyUSer } from '../utils/verifyToken.js';
import { createBooking, getAllBooking, getBooking } from '../controller/bookingController.js';


const router = express.Router()

router.post('/', verifyUSer, createBooking)
router.get('/:id', verifyUSer, getBooking)
router.get('/', verifyAdmin, getAllBooking)

export default router;
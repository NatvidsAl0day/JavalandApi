import express from 'express';
import { createTour, updateTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getFeaturedTour, getTourCount, getAllOutTour } from '../controller/tourController.js';
import { verifyAdmin, verifyUSer } from '../utils/verifyToken.js';

const router = express.Router()

router.post('/', verifyAdmin, createTour)
router.put('/:id', updateTour)
router.delete('/:id', deleteTour)

// Spesifik lebih dahulu
router.get('/allout/out', getAllOutTour)
router.get('/search/getTourBySearch', getTourBySearch)
router.get('/search/getFeaturedTours', getFeaturedTour)
router.get('/search/getTourCount', getTourCount)

// Yang umum
router.get('/', getAllTour)           // <= ini sebelum :id
router.get('/:id', getSingleTour)



export default router;

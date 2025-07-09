import express from 'express';
import { createTour, updateTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getFeaturedTour, getTourCount, getAllOutTour } from '../controller/tourController.js';
import { verifyAdmin, verifyUSer } from '../utils/verifyToken.js';

const router = express.Router()

// Buat Tour Baru
router.post('/', verifyAdmin, createTour)

//Update Tour
// router.put('/:id', verifyAdmin, updateTour)
router.put('/:id', updateTour)

//delete Tour
// router.delete('/:id', verifyAdmin, deleteTour)
router.delete('/:id', deleteTour)

//get Single Tour
router.get('/:id', getSingleTour)


//get All Tour
router.get('/', getAllTour)

// get All out Tour
router.get('/allout/out', getAllOutTour)

//get tour by pencarian
router.get('/search/getTourBySearch', getTourBySearch)

//get featured
router.get('/search/getFeaturedTours', getFeaturedTour)

// get Tour Count
router.get('/search/getTourCount', getTourCount)


export default router;
import express from 'express';
import { 
  createTour, 
  updateTour, 
  deleteTour, 
  getAllTour, 
  getSingleTour, 
  getTourBySearch, 
  getFeaturedTour, 
  getTourCount, 
  getAllOutTour 
} from '../controller/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js'; // hapus verifyUser kalau tidak dipakai

const router = express.Router();

// Proteksi semua perubahan data
router.post('/', verifyAdmin, createTour);
router.put('/:id', verifyAdmin, updateTour);
router.delete('/:id', verifyAdmin, deleteTour);

// Pencarian & filter (specific)
router.get('/allout', getAllOutTour);
router.get('/search/getTourBySearch', getTourBySearch);
router.get('/search/getFeaturedTours', getFeaturedTour);
router.get('/search/getTourCount', getTourCount);

// Listing umum & detail
router.get('/', getAllTour);
router.get('/:id', getSingleTour);

export default router;

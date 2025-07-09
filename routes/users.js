// routes/users.js
import express from 'express';
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser
} from '../controller/userController.js';    // pastikan ejaannya benar
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Update User (user sendiri atau admin)
router.put('/:id', verifyUser, updateUser);

// Delete User (user sendiri atau admin)
router.delete('/:id', verifyUser, deleteUser);

// Get Single User (user sendiri atau admin)
router.get('/:id', verifyUser, getSingleUser);

// Get All Users (hanya admin)
router.get('/', verifyAdmin, getAllUser);

export default router;

// routes/users.js
import express from 'express';
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser
} from '../controller/userController.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';





const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log('Looking for controller at:', resolve(__dirname, '../../controller/userController.js'));

// Update User (user sendiri atau admin)
router.put('/:id', verifyUser, updateUser);

// Delete User (user sendiri atau admin)
router.delete('/:id', verifyUser, deleteUser);

// Get Single User (user sendiri atau admin)
router.get('/:id', verifyUser, getSingleUser);

// Get All Users (hanya admin)
router.get('/', verifyAdmin, getAllUser);

export default router;

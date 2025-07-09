// routes/users.js
import express from 'express';
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser
} from '../controller/userController.js';    // pastikan ejaannya benar
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log('users.js running at:', __dirname);
console.log('looking for controller at:', resolve(__dirname, '../controller/userController.js'));


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

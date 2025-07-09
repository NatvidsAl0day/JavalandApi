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
console.log('Current working directory:', process.cwd());
console.log('Path to userController:', require.resolve('../controller/userController.js'));

// Update User (user sendiri atau admin)
router.put('/:id', verifyUSer, updateUser);

// Delete User (user sendiri atau admin)
router.delete('/:id', verifyUSer, deleteUser);

// Get Single User (user sendiri atau admin)
router.get('/:id', verifyUSer, getSingleUser);

// Get All Users (hanya admin)
router.get('/', verifyAdmin, getAllUser);

export default router;

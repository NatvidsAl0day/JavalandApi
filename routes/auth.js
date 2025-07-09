import express from 'express';
import { register,login, loginAdmin, registerAdmin } from '../controller/authContoller.js';

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/registerAdmin', registerAdmin)
router.post('/loginAdmin', loginAdmin)


export default router;
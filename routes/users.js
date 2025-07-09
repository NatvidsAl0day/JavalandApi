import express from 'express'
import { updateUser, deleteUser, getSingleUser, getAllUser } from '../controller/userContoller.js'
import { verifyUSer, verifyAdmin } from '../utils/verifyToken.js'



const router = express.Router()

router.put('/:id', verifyUSer, updateUser)

//delete Tour
router.delete('/:id', verifyUSer, deleteUser)

//get Single Tour
router.get('/:id', verifyUSer, getSingleUser)


//get All Tour
router.get('/', verifyAdmin, getAllUser)

export default router;
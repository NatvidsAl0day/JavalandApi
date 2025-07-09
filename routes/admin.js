import express from 'express'
import { verifyUSer, verifyAdmin } from '../utils/verifyToken.js'
import { deleteAdmin, getAllAdmin, getSingleAdmin, updateAdmin } from '../controller/adminController.js'



const router = express.Router()

router.put('/:id', verifyUSer, updateAdmin)

//delete Tour
router.delete('/:id', verifyUSer, deleteAdmin)

//get Single Tour
router.get('/:id', verifyUSer, getSingleAdmin)


//get All Tour
router.get('/', verifyAdmin, getAllAdmin)

export default router;
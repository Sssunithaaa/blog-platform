import express  from "express";
const router = express.Router()
import { authGuard,admin } from "../middleware/authMiddleware.js";
import {createComment, deleteComment, updateComment} from '../controller/commentController.js'

router.post("/create",authGuard,createComment)
router.delete('/delete/:commentId',deleteComment)
router.put('/update/:commentId',authGuard,updateComment)


export default router
import express  from "express";
const router = express.Router()
import { loginUser, registerUser,updateProfile,updateProfilePicture,userProfileController } from "../controller/userController.js";
import { authGuard } from "../middleware/authMiddleware.js";
import { uploadPicture } from "../middleware/pictureMiddleware.js";

router.post("/register", registerUser)
router.post("/login",loginUser)
router.get('/profile',authGuard,userProfileController)
router.put('/update',authGuard,updateProfile)
router.put('/updatePic',authGuard,updateProfilePicture)
export default router
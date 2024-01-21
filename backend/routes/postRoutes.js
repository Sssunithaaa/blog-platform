import express from "express";
const router = express.Router();
import { authGuard, admin } from "../middleware/authMiddleware.js";
import {
  createPosts,
  deletePost,
  getAllPosts,
  getPost,
  getUserPosts,
  updatePost,
} from "../controller/postController.js";

router.route("/").post(authGuard, admin, createPosts).get(getAllPosts);
router
  .route("/:slug")
  .put(authGuard, admin, updatePost)
  .delete(authGuard, admin, deletePost)
  .get(authGuard, getPost);

router.get("/users", authGuard, getUserPosts);
export default router;

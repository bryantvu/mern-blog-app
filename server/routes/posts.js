import express from "express";
import {
    getBlogPost, 
    getFeedPosts, 
    // getUserPosts, 
    likePost,
    getIpAddress,
    editBlogPost
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/** READ */
router.get("/feed", getFeedPosts);
router.get("/blog/:blogId", getBlogPost);
router.put("/edit/:blogId", verifyToken, editBlogPost);

/** IP ADDRESS */
router.get("/ip", getIpAddress);

/** UPDATE */
router.patch("/:id/like", likePost);

export default router;
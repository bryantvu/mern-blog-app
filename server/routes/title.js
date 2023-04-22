import express from "express";
import {
    getTitle,
    updateTitleHeader,
} from "../controllers/title.js";
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/** READ */
router.get("/get", getTitle);

/** UPDATE */
router.post("/update", updateTitleHeader);

export default router;
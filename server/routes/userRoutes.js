import express from "express";
import { getProfile, login, logout, signup } from "../controller/userController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/signup",signup)
router.post("/login", login)
router.get("/logout", logout)
router.get("/myprofile", isLoggedIn, getProfile)

export default router
import express from "express";
import { forgotPassword, getProfile, login, logout, resetPassword, signup } from "../controller/userController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.post("/signup", upload.single("avatar"), signup)
router.post("/login", login)
router.get("/logout", logout)
router.get("/myprofile", isLoggedIn, getProfile)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router
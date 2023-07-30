import express from "express";
import { changePassword, forgotPassword, getProfile, login, logout, resetPassword, signup, updateProfile } from "../controller/userController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.post("/signup", upload.single("avatar"), signup)
router.post("/login", login)
router.get("/logout", logout)
router.get("/myprofile", isLoggedIn, getProfile)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.post("change-password", isLoggedIn, changePassword)
router.put("update", isLoggedIn, upload.single("avatar"), updateProfile)

export default router
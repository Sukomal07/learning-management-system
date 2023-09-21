import express from "express";
import { changePassword, deleteProfile, forgotPassword, getProfile, login, logout, resetPassword, signup, updateProfile } from "../controller/userController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.post("/signup", upload.single("avatar"), signup)
router.post("/login", login)
router.get("/logout", logout)
router.get("/myprofile", isLoggedIn, getProfile)
router.post("/forgot-password", forgotPassword)
router.post("/reset/:resetToken", resetPassword)
router.put("/change-password", isLoggedIn, changePassword)
router.put("/update", isLoggedIn, upload.single("avatar"), updateProfile)
router.delete("/delete-profile", isLoggedIn, deleteProfile)

export default router
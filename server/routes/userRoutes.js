import express from "express";
import { getProfile, login, logout, signup } from "../controller/userController.js";

const router = express.Router()

router.post("/signup",signup)
router.post("login", login)
router.get("/logout", logout)
router.get("/myprofile", getProfile)

export default router
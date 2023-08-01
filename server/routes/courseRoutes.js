import { Router } from 'express'
import { getAllCourses, getLectures } from '../controller/courseController.js'
import { isLoggedIn } from "../middleware/authMiddleware.js";
const router = Router()

router.get('/', getAllCourses)
router.get("/:id", isLoggedIn, getLectures)


export default router
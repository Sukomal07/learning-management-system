import { Router } from 'express'
import { createCourse, deleteCourse, getAllCourses, getLectures, updateCourse } from '../controller/courseController.js'
import { isLoggedIn } from "../middleware/authMiddleware.js";
const router = Router()

router.get('/', getAllCourses)
router.post('/', isLoggedIn, createCourse)
router.put('/:id', isLoggedIn, updateCourse)
router.put('/:id', isLoggedIn, deleteCourse)
router.get("/:id", isLoggedIn, getLectures)


export default router
import { Router } from 'express'
import { addLecturesToCourse, createCourse, deleteCourse, deleteLectures, getAllCourses, getLectures, updateCourse, updateLectures } from '../controller/courseController.js'
import { authorizedRole, isLoggedIn, verifySubscription } from "../middleware/authMiddleware.js";
import upload from '../middleware/multer.js'
const router = Router()

router.get('/', getAllCourses)
router.post('/newcourse', isLoggedIn, authorizedRole('ADMIN'), upload.single("thumbnail"), createCourse)
router.put('/:id', isLoggedIn, authorizedRole('ADMIN'), upload.single("thumbnail"), updateCourse)
router.delete('/:id', isLoggedIn, authorizedRole('ADMIN'), deleteCourse)
router.get("/:id", isLoggedIn, verifySubscription, getLectures)
router.post('/:id', isLoggedIn, authorizedRole('ADMIN'), upload.single("lecture"), addLecturesToCourse)
router.put('/lectures/:id/:lectureId', isLoggedIn, authorizedRole('ADMIN'), upload.single("lecture"), updateLectures)
router.delete('/lectures/:id/:lectureId', isLoggedIn, authorizedRole('ADMIN'), deleteLectures)

export default router
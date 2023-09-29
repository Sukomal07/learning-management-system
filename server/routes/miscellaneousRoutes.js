import express from 'express'
import { contactUs, userStats } from '../controller/miscellaneous.js'
import { authorizedRole, isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/contactus', contactUs)
router.get('/admin/stats/users', isLoggedIn, authorizedRole('ADMIN'), userStats)
export default router
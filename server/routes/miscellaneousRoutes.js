import express from 'express'
import { contactUs } from '../controller/miscellaneous.js'

const router = express.Router()

router.post('/contactus', contactUs)

export default router
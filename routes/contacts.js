import express from 'express'
import { sendMessage } from '../controllers/contact.js'
import { verifyAdmin } from "../utils/verifyAdmin.js"

const router = express.Router()

router.use(verifyAdmin) // verifyAdmin for all routes

router.post('/', sendMessage)

// router.post('/', verifyAdmin, replyMessage) // for one route

export default router

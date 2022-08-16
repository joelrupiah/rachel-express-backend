import express from 'express'
import { getMessages, getMessage, editMessage, deleteMessage } from '../controllers/message.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

// GET STACKS

router.get('/get-messages', getMessages)

// GET SPECIFIC STACK

router.get('/get-message/:id', getMessage)

// SEND REPLY

router.put('/edit-message/:id', editMessage)

// DELETE STACK

router.delete('/delete-message/:id', deleteMessage)

export default router

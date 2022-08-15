import express from 'express'
import { createStack } from '../controllers/stack.js'

const router = express.Router()

// CREATE STACK

router.post('/', createStack)

export default router

import express from 'express'
import { createStack, editStack, deleteStack, getStacks, getStack } from '../controllers/stack.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

// GET STACKS

router.get('/get-stacks', getStacks)

// GET SPECIFIC STACK

router.get('/get-stack/:id', getStack)

// CREATE STACK

router.post('/create-stack', createStack)

// EDIT STACK

router.put('/edit-stack/:id', editStack)

// DELETE STACK

router.delete('/delete-stack/:id', deleteStack)

export default router

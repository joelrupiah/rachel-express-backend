import express from 'express'
import { getProjects, getProject, createProject, editProject, deleteProject } from '../controllers/project.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

// GET STACKS

router.get('/get-projects', getProjects)

// GET SPECIFIC STACK

router.get('/get-project/:id', getProject)

// CREATE STACK

router.post('/create-project', createProject)

// EDIT STACK

router.put('/edit-project/:id', editProject)

// DELETE STACK

router.delete('/delete-project/:id', deleteProject)

export default router

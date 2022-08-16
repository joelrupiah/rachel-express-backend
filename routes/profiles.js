import express from 'express'
import { getProfiles, getProfile, createProfile, editProfile, deleteProfile } from '../controllers/profile.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

// GET STACKS

router.get('/get-profiles', getProfiles)

// GET SPECIFIC STACK

router.get('/get-profile/:id', getProfile)

// CREATE STACK

router.post('/create-profile', createProfile)

// EDIT STACK

router.put('/edit-profile/:id', editProfile)

// DELETE STACK

router.delete('/delete-profile/:id', deleteProfile)

export default router

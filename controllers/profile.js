// import multer from 'multer'
// import {
//   v4 as uuidv4
// } from 'uuid'
// import path from 'path'
import Profile from '../models/Profile.js'

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images')
//   },
//   filename: (req, file, cb) => {
//     cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
//   }
// })

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter
// })


// export const createProfile = (upload.single('image'), (req, res, next) => {
//   const name = req.body.name
//   const image = req.file.image

//   const newProfileData = {
//     name,
//     image
//   }

//   const newProfile = new Profile(newProfileData)

//   newProfile.save()
//     .then(() => res.json("Profile created"))
//     .catch(err => res.status(400).json("Error:" + err))
// })

export const getProfiles = async (req, res) => {
  const getProfiles = await Profile.find()

  try {
    res.status(200).json({ status: "Fetched profiles", data: { getProfiles } })
  } catch (error) {
    res.status(500).json("Failed", { message: error })
  }
}

export const getProfile = async (req, res) => {
  const profile = await Profile.findById(req.params.id)
  try {
    res.status(200).json({ status: "Fetched profile", data: { profile } })
  } catch (error) {
    res.status(500).json("Failed", { message: error })
  }
}

export const createProfile = async (req, res) => {
  const saveProfile = new Profile(req.body)

  try {
    await saveProfile.save()
    res.status(201).json({ status: "Profile saved", data: { saveProfile } })
  } catch (error) {
    res.status(500).json("Failed to save", { message: error })
  }
}

export const editProfile = async (req, res) => {
  const updatedProfile = await Profile.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  try {
    res.status(200).json({status: "Updated", data: {updatedProfile}})
  } catch (error) {
    res.status(500).json("Error in server")
  }
}

export const deleteProfile = async (req, res) => {
  await Profile.findByIdAndDelete(req.params.id)

  try {
    res.status(204).json({status: "Deleted successfully"})
  } catch (error) {
    res.status(500).json({status: "Failed", message: error})
  }
}

// import multer from 'multer'
// import {
//   v4 as uuidv4
// } from 'uuid'
// import path from 'path'
import Project from '../models/Project.js'

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


// export const createProject = (upload.single('image'), (req, res, next) => {
//   const name = req.body.name
//   const image = req.file.image

//   const newProjectData = {
//     name,
//     image
//   }

//   const newProject = new Project(newProjectData)

//   newProject.save()
//     .then(() => res.json("Project created"))
//     .catch(err => res.status(400).json("Error:" + err))
// })

export const getProjects = async (req, res) => {
  const getProjects = await Project.find()

  try {
    res.status(200).json({ status: "Fetched projects", data: { getProjects } })
  } catch (error) {
    res.status(500).json("Failed", { message: error })
  }
}

export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id)
  try {
    res.status(200).json({ status: "Fetched project", data: { project } })
  } catch (error) {
    res.status(500).json("Failed", { message: error })
  }
}

export const createProject = async (req, res) => {
  const saveProject = new Project(req.body)

  try {
    await saveProject.save()
    res.status(201).json({ status: "Project saved", data: { saveProject } })
  } catch (error) {
    res.status(500).json("Failed to save", { message: error })
  }
}

export const editProject = async (req, res) => {
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  try {
    res.status(200).json({status: "Updated", data: {updatedProject}})
  } catch (error) {
    res.status(500).json("Error in server")
  }
}

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)

  try {
    res.status(204).json({status: "Deleted successfully"})
  } catch (error) {
    res.status(500).json({status: "Failed", message: error})
  }
}
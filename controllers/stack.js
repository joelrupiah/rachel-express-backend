// import multer from 'multer'
// import {
//   v4 as uuidv4
// } from 'uuid'
// import path from 'path'
import Stack from '../models/Stack.js'

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


// export const createStack = (upload.single('image'), (req, res, next) => {
//   const name = req.body.name
//   const image = req.file.image

//   const newStackData = {
//     name,
//     image
//   }

//   const newStack = new Stack(newStackData)

//   newStack.save()
//     .then(() => res.json("Stack created"))
//     .catch(err => res.status(400).json("Error:" + err))
// })

export const getStacks = async (req, res) => {
  const getStacks = await Stack.find()

  try {
    res.status(200).json({ status: "Fetched stacks", data: { getStacks } })
  } catch (error) {
    res.status(500).json("Failed", { message: error })
  }
}

export const getStack = async (req, res) => {
  const stack = await Stack.findById(req.params.id)
  try {
    res.status(200).json({ status: "Fetched stack", data: { stack } })
  } catch (error) {
    res.status(500).json("Failed", { message: error })
  }
}

export const createStack = async (req, res) => {
  const saveStack = new Stack(req.body)

  try {
    await saveStack.save()
    res.status(201).json({ status: "Stack saved", data: { saveStack } })
  } catch (error) {
    res.status(500).json("Failed to save", { message: error })
  }
}

export const editStack = async (req, res) => {
  const updatedStack = await Stack.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  try {
    res.status(200).json({status: "Updated", data: {updatedStack}})
  } catch (error) {
    res.status(500).json("Error in server")
  }
}

export const deleteStack = async (req, res) => {
  await Stack.findByIdAndDelete(req.params.id)

  try {
    res.status(204).json({status: "Deleted successfully"})
  } catch (error) {
    res.status(500).json({status: "Failed", message: error})
  }
}
import multer from 'multer'
import {
  v4 as uuidv4
} from 'uuid'
import path from 'path'
import Stack from '../models/Stack.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage,
  fileFilter
})


export const createStack = (upload.single('image'), (req, res, next) => {
  const name = req.body.name
  const image = req.file.image

  const newStackData = {
    name,
    image
  }

  const newStack = new Stack(newStackData)

  newStack.save()
    .then(() => res.json("Stack created"))
    .catch(err => res.status(400).json("Error:" + err))
})

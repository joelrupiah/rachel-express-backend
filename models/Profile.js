import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true
  },
  middle: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

export default mongoose.model('Profile', ProfileSchema)

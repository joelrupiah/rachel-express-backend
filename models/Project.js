import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model('Project', ProjectSchema)

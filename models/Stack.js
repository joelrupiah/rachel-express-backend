import mongoose from 'mongoose'

const StackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model('Stack', StackSchema)

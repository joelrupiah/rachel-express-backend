import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model('User', UserSchema)

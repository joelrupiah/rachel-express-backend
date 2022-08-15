import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
import validator from "validator"

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
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

// STATIC REGISTER METHOD
UserSchema.statics.register = async function(email, password) {

    // VALIDATION

    if(!email || !password){
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough, please include letters numbers capital and symbols")
    }

    const exists = await this.findOne({ email })
    if(exists){
        throw Error("Email already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })


    return user

}

// STATIC LOGIN METHOD
UserSchema.statics.login = async function(email, password){
    // VALIDATION

    if(!email || !password){
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    const user = await this.findOne({ email })
    if(!user){
        throw Error("Check your login credentials and try again")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error("Incorrect password")
    }

    return user

}

export default mongoose.model('User', UserSchema)

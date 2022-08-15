import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

export const register = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.register(email, password)

        // CREATE TOKEN
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // CREATE TOKEN
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
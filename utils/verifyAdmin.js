import jwt from "jsonwebtoken"
import User from "../models/User.js"
export const verifyAdmin = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({ error: "Authorization token required" })
    }

    // split token ~'Bearer sjkgjkggdsg'~
    const token = authorization.split(' ')[1] // position one which is the token

    try {

        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findOne({ _id }).select('_id') // returns only id
        next()

    } catch (error) {
        res.status(401).json({ error: "Request is not authorized" })
    }

}

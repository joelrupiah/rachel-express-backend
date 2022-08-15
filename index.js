import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import nodemailer from "nodemailer"
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import detailsRoute from './routes/details.js'
import stacksRoute from './routes/stacks.js'
import contactsRoute from './routes/contacts.js'
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongodb")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconected")
})

mongoose.connection.on("connected", () => {
    console.log("mongodb conected")
})

// EMAIL SENDING WITH NODEMAILER

export const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

// EMAIL SENDING WITH NODEMAILER END

//MIDDLEWARES START

app.use(cors()) // for url frontend connection

app.use(cookieParser()) // for storing token in cookie

app.use(express.json()) // to send json data

app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use('/details', detailsRoute)
app.use('/stacks', stacksRoute)
app.use('/contacts', contactsRoute)

// Error handling middleware

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

// MIDDLEWARES END

app.listen(process.env.PORT, () => {
    connect()
    console.log("Running nodejs express framework")
})

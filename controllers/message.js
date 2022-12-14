import sgMail from '@sendgrid/mail'
import Message from '../models/Message.js'
import {
  contactEmail
} from '../index.js'

export const sendMessage = async (req, res) => {
  const sentMessage = new Message(req.body)

    try {
      await sentMessage.save()

      const mail = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: req.body.subject,
        html: `<p>Thank you for contacting me. I will get back to you shortly :)</p>`,
      };
      contactEmail.sendMail(mail, (error) => {
        if (error) {
          res.json({
            status: "ERROR"
          });
        } else {
          res.json({
            status: "Message Sent"
          });
        }
      });

      res.status(201).json({ status: "Message saved", data: { sentMessage } })
    } catch (error) {
      res.status(500).json("Failed to save", { message: error })
    }
}

export const getMessages = async (req, res) => {
  const getMessages = await Message.find()

  try {
    res.status(200).json({ status: "Fetched messages", data: { getMessages } })
  } catch (error) {
    res.status(500).json("Failed", { message: error })
  }
}

export const getMessage = async (req, res) => {
  const message = await Message.findById(req.params.id)
  try {
    res.status(200).json({ status: "Fetched message", data: { message } })
  } catch (error) {
    res.status(500).json("Failed", { message: error })
  }
}

export const createMessage = async (req, res) => {
  const saveMessage = new Message(req.body)

  try {
    await saveMessage.save()
    res.status(201).json({ status: "Message saved", data: { saveMessage } })
  } catch (error) {
    res.status(500).json("Failed to save", { message: error })
  }
}

export const editMessage = async (req, res) => {
  const updatedMessage = await Message.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  try {
    res.status(200).json({status: "Updated", data: {updatedMessage}})
  } catch (error) {
    res.status(500).json("Error in server")
  }
}

export const deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete(req.params.id)

  try {
    res.status(204).json({status: "Deleted successfully"})
  } catch (error) {
    res.status(500).json({status: "Failed", message: error})
  }
}

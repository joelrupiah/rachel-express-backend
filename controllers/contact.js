import sgMail from '@sendgrid/mail'
import Contact from '../models/Contact.js'
import {
  contactEmail
} from '../index.js'




export const sendMessage = async (req, res) => {
  const newMessage = new Contact(req.body)
  const email = req.body.email

  try {
    const savedMessage = await newMessage.save()
    const mail = {
      from: email,
      to: process.env.EMAIL,
      subject: req.body.subject,
      html: `<p>Message: ${req.body.message}</p>`,
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
    res.status(201).json(savedMessage)
  } catch (err) {
    res.status(500).json(err)
  }
}

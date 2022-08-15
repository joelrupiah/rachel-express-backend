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
      // replyTo: email,
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

    // console.log(process.env.SENDGRID_API_KEY)
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    //
    // const msg = {
    //   to: req.body.email, // Change to your recipient
    //   from: 'rupiahjeremiah@gmail.com', // Change to your verified sender
    //   subject: req.body.subject,
    //   text: req.body.message,
    //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // }
    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log('Email sent')
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })

    res.status(201).json(savedMessage)
  } catch (err) {
    res.status(500).json(err)
  }
}

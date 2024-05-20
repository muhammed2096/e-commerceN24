
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { emailTemp } from "./emailTemplate.js"

export const sendEmail = async(email) =>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_PASS,
        },
    })
}

let token = jwt.sign({email}, 'sendingEmail')
 // send mail with defined transport object
 const info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${process.env.EMAIL_NAME}>`, // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailTemp(token), // html body
  });

  console.log("Message sent: %s", info.messageId); 
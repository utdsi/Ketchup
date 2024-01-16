
const nodemailer = require("nodemailer")

require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.net",
    port: 587,
    secure: false,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,
    },
});


const mailOptions = {
    from: {
        name: "Flutter App",
        address: process.env.USER
    },

    // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Reset Password", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
}

const sendMail = async (transporter, mailOptions) => {

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

sendMail(transporter, mailOptions)
















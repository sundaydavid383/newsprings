const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("app passwoord:", process.env.APP_PASSWORD)
const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.APP_PASSWORD,
    },
});
 
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };
    return transporter.sendMail(mailOptions)
    
}

module.exports = sendEmail

const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("app passwoord:", process.env.APP_PASSWORD)
const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user:"sundayudoh383@gmail.com",
        pass:process.env.APP_PASSWORD,
    },
});
 
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: "sundayudoh383@gmail.com",
        to,
        subject,
        text,
    };
    return transporter.sendMail(mailOptions)
    
}

module.exports = sendEmail

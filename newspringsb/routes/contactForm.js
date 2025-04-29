const express = require("express")
const nodemailer = require("nodemailer")
require('dotenv').config()

const router = express.Router()



router.post("/send-contact-message", async (req, res) => {
    let { name, email, message } = req.body;
  
    // Check if all fields exist
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields (name, email, message) are required." });
    }
  
    // Make sure they are strings
    name = String(name).trim();
    email = String(email).trim();
    message = String(message).trim();
  
    // Optional: simple email validation (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }
  
    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
      }
    });
  
    // Set mail options
    let mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New contact message from ${name}`,
      text: `${email} said: ${message}\n\nReply to: ${email}`
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Message sent successfully." });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: "Failed to send email." });
    }
  });
module.exports = router
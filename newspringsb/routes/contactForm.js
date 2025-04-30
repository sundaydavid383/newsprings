const express = require("express")
const nodemailer = require("nodemailer")
require('dotenv').config()

const router = express.Router()



router.post("/send-contact-message", async (req, res) => {
    let { name, email, phone, message } = req.body;
  
    // Check if all fields exist
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields (name, email, phone, message) are required." });
    }
  
    // Make sure they are strings
    name = String(name).trim();
    email = String(email).trim();
    phone = String(phone).trim();
    message = String(message).trim();
  
    // Optional: simple email validation (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }
  // Basic phone number validation (international support)
const cleanedPhone = phone.replace(/[\s-]/g, '');
const digitOnlyPhone = cleanedPhone.replace(/\D/g, '');

if (!/^\+?[\d\s-]+$/.test(phone) || digitOnlyPhone.length < 10) {
  return res.status(400).json({ message: "Invalid phone number." });
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
      text: `${name} said: ${message}\n\nReply to: ${email} or ${phone}`
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
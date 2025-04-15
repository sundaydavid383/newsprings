const mongoose = require('mongoose');

// Define schema to match the form fields
const RegistrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // This should ideally be hashed before storing
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
  hearAboutUs: { type: String, required: true },
  interest: { type: String, required: true },
  prayerRequest: { type: String },
}, { timestamps: true });

module.exports = (connection) => connection.model("Registration", RegistrationSchema, "registrations");
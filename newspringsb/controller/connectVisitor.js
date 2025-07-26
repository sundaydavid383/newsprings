const getConnectVisitorModel  = require("../models/connectVisitorModel");


exports.connectVisitors = async (req, res) => {

  const {
    fullname,
    email,
    phone,
    serviceDate,
    guests,
    bringingKids,
    contactMethod,
    heardFrom,
    accessibilityNeeds,
    message,
  } = req.body;

  // Validate required fields
  if (!fullname || !email || !phone || !serviceDate) {
    console.log("Full name, email, phone, and service date are required.")
    return res.status(400).json({
      message: "Full name, email, phone, and service date are required.",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("Please enter a valid email address.")
    return res.status(400).json({
      message: "Please enter a valid email address.",
    });
  }

  // Validate phone number (basic 10–15 digit check)
  const phoneRegex = /^\+?\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    console.log("Please enter a valid phone number.")
    return res.status(400).json({
      message: "Please enter a valid phone number.",
    });
  }

  // Validate serviceDate is a real future date
  const serviceDateObj = new Date(serviceDate);
  const today = new Date();
  if (isNaN(serviceDateObj.getTime()) || serviceDateObj < today) {
    console.log("Please select a valid future service date.")
    return res.status(400).json({
      message: "Please select a valid future service date.",
    });
  }

  const validGuestOptions = ["Just me", "2-3", "4 or more"];

  // Optional: guests should be a number if provided
  if (guests && !validGuestOptions.includes(guests)) {
  console.log("Guests must be one of: Just me, 2-3, or 4 or more.");
  return res.status(400).json({
    message: "Guests must be one of: Just me, 2-3, or 4 or more.",
  });
}


  try {
     const ConnectVisitor = await getConnectVisitorModel();
    // Check for existing visitor with same name and email
    const existingVisitor = await ConnectVisitor.findOne({
      fullname: fullname.trim(),
      email: email.toLowerCase().trim(),
    });

    if (existingVisitor) {
        console.log("You've already submitted this form. Thank you!");
      return res.status(400).json({
        message: "You've already submitted this form. Thank you!",
      });
    }

    // Save new visitor
    const newVisitor = new ConnectVisitor({
      fullname: fullname.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      serviceDate: serviceDateObj,
      guests,
      bringingKids,
      contactMethod,
      heardFrom,
      accessibilityNeeds,
      message,
    });

    await newVisitor.save();


     console.log("Visitor connected successfully.")
    return res.status(201).json({
      message: "Your visit has been planned successfully. See you soon!",
      data: newVisitor,
    });
  } catch (error) {
    console.error("Error while storing visitor:", error);
    return res.status(500).json({
      message: "There was a server error while connecting user.",
    });
  }
};

exports.getAllConnectedVisitors = async (req, res) => {
  try {
    const ConnectVisitor = await getConnectVisitorModel();
    const visitors = await ConnectVisitor.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(visitors);
  } catch (error) {
    console.error("Error fetching connected visitors:", error);
    res.status(500).json({ message: "Server error: Could not retrieve visitors." });
  }
};


const mongoose = require("mongoose");
const connectDatabases = require("../db");
   

let ConnectVisitorModel;

async function getConnectedVisitorModel() {
  if (ConnectVisitorModel) return ConnectVisitorModel;

  const { registrationsConnection } = await connectDatabases();
  const schema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },

    serviceDate: { type: Date },

    guests: {
      type: String,
      enum: ["Just me", "2-3", "4 or more"],
      required: true,
    },

    bringingKids: {
      type: String,
      enum: ["Yes", "No", "Not sure yet"],
    },

    contactMethod: {
      type: String,
      enum: ["Email", "Phone call", "WhatsApp"],
      required: true,
    },

    heardFrom: { type: String },
    accessibilityNeeds: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);
  
   ConnectVisitorModel = registrationsConnection.model("ConnectVisitor", schema, "connect_visitors");
  return ConnectVisitorModel;
}






module.exports  = getConnectedVisitorModel
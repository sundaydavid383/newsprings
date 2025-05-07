const mongoose = require("mongoose");

const TestimonySchema = new mongoose.Schema({
  video: { type: String },
  image: { type: String },
  name: { type: String, required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
  testimony: { type: String, required: true },
  scriptureReference: { type: String, required: true },
  testimonyCategory: { type: String, required: true },
  followUpAction: { type: String },
  impact: { type: String },
  lessonLearned: { type: String },
  prayerRequest: { type: String },
  churchDetails: { type: Object },
  validated: { type: Boolean },
}, { timestamps: true });

module.exports = (connection) =>
  connection.model("Testimony", TestimonySchema, "testimonies");
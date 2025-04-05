const mongoose = require("mongoose")
const TestimonySchema = new mongoose.Schema({
    video: { type: String, required: false }, // YouTube video ID (optional)
    image: { type: String, required: false },
    name: { type: String, required: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    testimony: { type: String, required: true },
    scriptureReference: { type: String, required: true },
    testimonyCategory: { type: String, required: true },
    followUpAction: { type: String, required: false },
    impact: { type: String, required: false },
    lessonLearned: { type: String, required: false },
    prayerRequest: { type: String, required: false },
    churchDetails: { type: Object, required: false },
  }, { timestamps: true });

const Testimony = mongoose.model('Testimony', TestimonySchema)
module.exports = Testimony
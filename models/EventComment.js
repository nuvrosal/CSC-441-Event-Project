const mongoose = require("mongoose");

const eventCommentSchema = new mongoose.Schema({
  event_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("EventComment", eventCommentSchema);
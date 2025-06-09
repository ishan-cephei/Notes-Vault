const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Notes", notesSchema);
module.exports = Note;

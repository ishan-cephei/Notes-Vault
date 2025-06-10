const Note = require("../models/note.model");

const createNote = async (req, res) => {
  try {
    const payload = req.body;
    const response = await Note.create(payload);
    res
      .status(201)
      .json({ success: true, message: "Note created", data: response });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: err.message || "Validation error while creating note",
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while creating note",
      });
    }
  }
};

const getNotes = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    
    const response = await Note.find({ userId: userId });
    res
      .status(200)
      .json({ success: true, message: "Notes fetched", data: response });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Some error occurred while getting notes",
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id: noteId } = req.params;
    const payload = req.body;
    const response = await Note.findByIdAndUpdate(noteId, payload, {
      runValidators: true,
      new: true,
    });
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Note Updated", data: response });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: err.message || "Validation error while updating note",
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while updating note",
      });
    }
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id: noteId } = req.params;
    const response = await Note.findByIdAndDelete(noteId);
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Note deleted", data: response });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Some error occurred while deleting note",
    });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };

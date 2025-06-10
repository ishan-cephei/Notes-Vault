const express = require("express");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");
const authenticate = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authenticate, getNotes);

router.post("/", authenticate, createNote);

router.put("/:id", authenticate, updateNote);

router.delete("/:id", authenticate, deleteNote);

module.exports = router;

const express = require("express");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");
const authenticate = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer");

const router = express.Router();

router.get("/", authenticate, getNotes);

router.post("/", authenticate, upload.single("file"), createNote);

router.put("/:id", authenticate, upload.single("file"), updateNote);

router.delete("/:id", authenticate, deleteNote);

module.exports = router;

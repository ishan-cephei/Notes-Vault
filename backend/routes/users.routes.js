const express = require("express");
const createUser = require("../controllers/user.contoller");

const router = express.Router();

router.post("/", createUser);

module.exports = router;

const express = require("express");
const userLogin = require("../controllers/login.controller");

const router = express.Router();

router.post("/", userLogin);

module.exports = router;

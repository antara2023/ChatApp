const express = require("express");
const {
  generateMessage
} = require("../utils/messages.js");

const router = express.Router();

// router.post("/sign-up", signUp);
// router.post("/sign-in", signIn);
router.post("/", generateMessage);

module.exports = router;

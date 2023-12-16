const express = require("express");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("../utils/users.js");

const router = express.Router();

// router.post("/sign-up", signUp);
// router.post("/sign-in", signIn);
router.post("/", addUser);
router.post("/list/:userId", removeUser);
router.get("/list/:userId", getUser);
router.get("/list", getUsersInRoom);

module.exports = router;

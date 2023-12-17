const { Schema, model } = require("mongoose");

const ActiveUserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: [true, "UserId is required!"],
  },
  room: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const ActiveUser = model("activeuser", ActiveUserSchema);

module.exports = ActiveUser;

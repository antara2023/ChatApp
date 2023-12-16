const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
    lowercase: true,
  },
  room: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const User = model("user", UserSchema);

module.exports = User;

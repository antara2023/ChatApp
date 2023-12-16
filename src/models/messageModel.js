const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  room: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Message = model("message", MessageSchema);

module.exports = Message;

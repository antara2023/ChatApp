const Message = require("../models/messageModel.js");
const generateMessage = async (room, user, text) => {
  const message = { room, user, text };
  console.log("message inside generateMessage", message, user);
  await Message.create(message);
  return {
    user,
    text,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessage,
};

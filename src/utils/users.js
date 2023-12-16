const User = require("../models/userModel");
const addUser = async ({ id, username, room }) => {
  try {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();
    if (!username || !room) {
      return {
        error: "Username and room are required.",
      };
    }
    const existingUser = await User.findOne({ room, username });

    if (existingUser) {
      return {
        error: "Username is in use!",
      };
    }
    const user = { id, username, room };
    await User.create(user);
    return user;
  } catch (e) {
    console.log("addUser in user.js-error");
  }
};

const removeUser = async (id) => {
  const index = await User.findByIdAndDelete(id);
};

const getUser = async (id) => {
  return await User.findOne({ id }); //4
};

const getUsersInRoom = async (room) => {
  room = room ? room.trim().toLowerCase() : "dummy";
  return await User.find({ room });
};
module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};

const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const connectToDatabase = require("./src/config/dbconfig.js");
const { generateMessage } = require("./src/utils/messages.js");

// const {
//   addUser,
//   removeUser,
//   getUser,
//   getUsersInRoom,
// } = require("./src/utils/activeUsers.js")

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./src/utils/activeUsers.js");

const { config } = require("dotenv");
config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "./public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.on("join", async ({ username, room }, callback) => {
    try {
      let { user, error } = await addUser({ id: socket.id, username, room });
      if (error) {
        throw new Error(error);
      }
      socket.join(user.room);

      socket.emit(
        "message",
        await generateMessage(user.room, "Admin", "Welcome!")
      );
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          await generateMessage(
            user.room,
            "Admin",
            `${user.username} has joined!`
          )
        );
      io.to.emit;
      socket.broadcast.to.emit;
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: await getUsersInRoom(user.room),
      });
      callback();
    } catch (e) {
      console.log("error -line 38", e);
    }
  });
  socket.on("sendMessage", async (message, callback) => {
    const user = await getUser(socket.id);
    console.log("line 57 index.js", user, socket.id);

    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("profanity is not allowed");
    }
    io.to(user.room).emit(
      "message",
      await generateMessage(user.room, user.username, message)
    );
    callback();
  });
  socket.on("disconnect", async () => {
    const user = await removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        await generateMessage(user.room, "Admin", `${user.username} has left!`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: await getUsersInRoom(user.room),
      });
    }
  });
});
server.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is up on port ${port}!`);
});

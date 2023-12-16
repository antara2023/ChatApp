const mongoose = require("mongoose");

const connectToDatabase = async () => {
  const { connection } = await mongoose.connect(
    `mongodb+srv://antaranitdgp11:${process.env.DATABASE_PASSWORD}@cluster0.wqvijmq.mongodb.net/ChatApp`
  );

  if (connection) {
    console.log(`1connected to database ${connection.host}`);
  }
};

module.exports = connectToDatabase;

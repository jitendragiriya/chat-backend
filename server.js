// includint the require packages
const http = require("http");
const app = require("./app");
const socketIO = require("socket.io");
const ConnectDb = require("./config/db");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// conneting the database.
ConnectDb();

const Errors = require("./Middlewares/Errors");
const { saveMessage } = require("./controllers/chat");
app.use(Errors);
// server listening
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: [
      `${process.env.DEVELOPMENT_CORS}`,
      `${process.env.PRODUCTION_CORS}`,
    ],
    credentials: true,
  },
});

const users = {}; // Create an object to store user data

io.on("connection", (socket) => {
  console.log("User connected");

  // When a user connects, store their socket ID in the users object
  socket.on("setUser", (receiverId) => {
    users[receiverId] = socket.id;
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    // Remove the user from the users object when they disconnect
    for (const username in users) {
      if (users[username] === socket.id) {
        delete users[username];
        break;
      }
    }
  });

  socket.on("privateMessage", ({ senderId, receiverId, message, time }) => {
    saveMessage(senderId, receiverId, message);
    // Send a private message to a specific user using their socket ID
    if (users[receiverId]) {
      io.to(users[receiverId]).emit("privateMessage", {
        senderId,
        receiverId,
        message,
        time,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`error:${err.message}`);
  console.log("sutting down the server due to unhandled promis rejection.");
  server.close(() => {
    process.exit(1);
  });
});

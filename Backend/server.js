const express = require("express");
const { createServer } = require("http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(join(__dirname, '../Frontend')));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, '../Frontend/index.html'));
});

io.on("connection", (socket) => {
  socket.on("user-login", (userData) => {
    console.log("User logged in:", userData);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // socket.on('chat message', (msg) => {
  //     console.log('Message Recieved: ' + msg);
  //     io.emit('chat message')
  // });
});

server.listen("8080", () => {
  console.log("server running at http://localhost:8080");
});

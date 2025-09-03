const express = require("express");
const { createServer } = require("http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const users = new Map();

app.use(express.static(join(__dirname, '../Frontend')));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, '../Frontend/index.html'));
});

io.on("connection", (socket) => {
  socket.on("user-login", (userData) => {
    console.log("User logged in:", userData.username + ` SocketID: ${socket.id}`);

    users.set(socket.id, userData)

    socket.broadcast.emit('user joined', userData.username);

    const userList = Array.from(users.values());
    io.emit('user list', userList);

    io.emit('user count', users.size)

    console.log(users.size + ' Online users')
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);

    const userData = users.get(socket.id);

    if(userData){
      users.delete(socket.id);

      socket.broadcast.emit('user left', userData.username);

      const userList = Array.from(users.values());
      io.emit('user list', userList);

      io.emit('user count', users.size);
      
      console.log(`${userData.username} left. Total users online: ${users.size}`);

    }
  });

  socket.on('chat message', (messageData) => {
  
   console.log('Message received from', messageData.username + ':', messageData.message);

   io.emit('chat message', messageData)

  });
  
});

server.listen("8080", () => {
  console.log("server running at http://localhost:8080");
});

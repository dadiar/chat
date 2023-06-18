const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000; // Change this port number if needed

app.use(express.static(__dirname + '/'));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('join', room => {
    if (socket.room) {
      socket.leave(socket.room);
    }
    socket.join(room);
    socket.room = room;

    io.to(room).emit('message', {
      type: 'userJoined',
      user: 'New user'
    });
  });

  socket.on('message', data => {
    if (socket.room) {
      io.to(socket.room).emit('message', { content: data.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

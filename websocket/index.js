const socketio = require('socket.io');
const { createServer } = require('http');

const server = createServer();
const io = socketio(server);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('savePost', (post) => {
    socket.broadcast.emit('savePost', post);
  });

});

server.listen(port, () => console.log(`Server listening on port ${port}`));

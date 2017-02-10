const { createServer } = require('http');
const socketio = require('socket.io');

const server = createServer();
const io = socketio(server);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => console.log(`Server listening on port ${port}`));

const SocketIo = require('socket.io');

module.exports = function (server) {
  const io = new SocketIo(server, { path: '/api/result' });
  io.on('connection', (socket) => {
    socket.on('new vote', (data) => {
      io.emit('change result', data);
    });
  });
};

exports = module.exports;

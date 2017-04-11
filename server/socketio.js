const SocketIo = require('socket.io');

module.exports = function (server) {
  const io = new SocketIo(server, { path: '/api/result' });
<<<<<<< HEAD
  const clients = [];
=======
>>>>>>> (refactor) Socket.io organization
  io.on('connection', (socket) => {
    clients.push(socket);
    console.log('connected', clients.length);
    socket.on('new vote', (data) => {
      io.emit('change result', data);
    });

    socket.on('disconnect', () => {
      const i = clients.indexOf(socket);
      clients.splice(i, 1);
      console.log('disconnected', clients.length, i);
    });
  });
};

exports = module.exports;

module.exports = function (io) {
  const clients = [];
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

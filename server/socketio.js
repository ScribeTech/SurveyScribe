module.exports = function (io) {
  const clients = [];
  io.on('connection', (socket) => {
    clients.push(socket);
    socket.on('new vote', (data) => {
      io.emit('change result', data);
    });
  });

  io.on('disconnect', (socket) => {
    const i = clients.indexOf(socket);
    clients.splice(i, 1);
  });
};

exports = module.exports;

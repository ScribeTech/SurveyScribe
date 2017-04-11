module.exports = function (io) {
  const clients = [];
  io.on('connection', (socket) => {
    clients.push(socket);
    console.log(clients.length);
    socket.on('new vote', (data) => {
      socket.broadcast.emit('change result', data);
    });

    socket.on('disconnect', () => {
      console.log(clients.length);
      const i = clients.indexOf(socket);
      clients.splice(i, 1);
    });
  });
};

exports = module.exports;

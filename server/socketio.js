module.exports = function (io) {
  io.on('connection', (socket) => {
    socket.on('new connection', (data) => {
      io.emit('sync state', data);
    });

    socket.on('state change', (data) => {
      io.emit('new state', data);
    });
  });
};

exports = module.exports;

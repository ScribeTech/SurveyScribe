module.exports = function (io) {
  io.on('connection', (socket) => {
    socket.on('new vote', (data) => {
      io.emit('change result', data);
    });
  });
};

exports = module.exports;

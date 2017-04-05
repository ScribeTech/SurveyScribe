module.exports = function (io) {
  io.on('connection', (socket) => {
    socket.on('created survey', (data) => {
      console.log(data);
      io.emit('new survey', data);
    });

    socket.on('voted', (data) => {
      console.log(data);
      io.emit('new vote', data);
    });
  });
};

exports = module.exports;

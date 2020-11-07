const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { addUser, updateUser, removeUser, getUser, getActiveUsers } = require('./userHelpers.js');
const PORT = process.env.PORT || 3000;
const router = require('./router');
const moment = require('moment');

app.use(router);

io.on('connect', (socket) => {
  const room = `Nate's Chat Room`;
  socket.on('join', (callback) => {
    const { error, user } = addUser({ id: socket.id });
    if (error) return callback(error);

    socket.join(room);

    socket.emit('notification', { id: user.id, user: user.name, text: `Hi ${user.name}, Welcome to ${room}!` });
    socket.broadcast.to(room).emit('message', { user: 'Moderator', text: `${user.name} has joined the room!`, time: moment().format("hh:mm a").toString()});
    io.to(room).emit('roomData', { room: room, users: getActiveUsers() })
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    let user = getUser(socket.id);
    if (message.trim().startsWith('/name ')) {
      const newNameCmd = message.trim().split(' ');
      const updatedName = newNameCmd[1];
      message = `${user.name} has changed their name to ${updatedName}!`;
      const updatedUser = updateUser(socket.id, updatedName);
      io.to(room).emit('message', { user: 'Moderator', text: message, newName: updatedUser.name, time: moment().format("hh:mm a").toString(), users: getActiveUsers() });
    } else {
      io.to(room).emit('message', { id: user.id, user: user.name, text: message, time: moment().format("hh:mm a").toString()});
    }
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(room).emit('message', { user: 'Moderator', text: `${user.name} has left.`, time: moment().format("hh:mm a").toString()});
      io.to(room).emit('roomData', { room: room, users: getActiveUsers()});
    }
  })
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

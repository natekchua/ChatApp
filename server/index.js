const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { addUser, removeUser, getUser, getActiveUsers } = require('./userHelpers.js');
const PORT = process.env.PORT || 3000;
const router = require('./router');
const moment = require('moment');

app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);
    
    socket.broadcast.to(user.room).emit('message', { user: 'Moderator', text: `${user.name} has joined the room!`, time: moment().format("hh:mm a").toString()});
    io.to(user.room).emit('roomData', { room: user.room, users: getActiveUsers(user.room) })
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message, time: moment().format("hh:mm a").toString()});
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'Moderator', text: `${user.name} has left.`, time: moment().format("hh:mm a").toString()});
      io.to(user.room).emit('roomData', { room: user.room, users: getActiveUsers(user.room)});
    }
  })
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

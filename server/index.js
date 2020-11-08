const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { addUser, updateUsername, updateUserColor, removeUser, getUser, getActiveUsers } = require('./userHelpers.js');
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

    socket.emit('notification', { mod: user.name, user: user, text: `Hi ${user.name}, Welcome to ${room}!` });
    socket.broadcast.to(room).emit('message', { mod: 'Moderator', user: user, text: `${user.name} has joined the room!`, time: moment().format("hh:mm a").toString() });
    io.to(room).emit('roomData', { room: room, users: getActiveUsers() })
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    let user = getUser(socket.id);
    if (message.trim().startsWith('/name ')) {
      const newNameCmd = message.trim().split(' ');
      const updatedName = newNameCmd[1];
      message = `${user.name} has changed their name to '${updatedName}'!`;
      const updatedUser = updateUsername(socket.id, updatedName);
      if (!updatedUser) message = `The name '${updatedName}' has already been taken.`;
      io.to(room).emit('message', { mod: 'Moderator', user: user, text: message, newName: updatedUser.name, time: moment().format("hh:mm a").toString(), users: getActiveUsers() });
    } else if (message.trim().startsWith('/color ')) {
      const colorCmd = message.trim().split(' ');
      if (!(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCmd[1]) || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCmd[1]))) { // check if value is RGB/RRGGBB.
        message = `@${user.name}, You entered an invalid color value. Use RGB or RRGGBB.`;
      } else {
        let colorOfName = colorCmd[1];
        if(colorOfName.charAt(0) !== '#') colorOfName = `#${colorOfName}`;
        updateUserColor(socket.id, colorOfName);
        message = `${user.name} has changed the color of their name to ${colorOfName}!`;
      }
      io.to(room).emit('message', { mod: 'Moderator', user: user, text: message, time: moment().format("hh:mm a").toString(), users: getActiveUsers() });
    } else {
      io.to(room).emit('message', { user: user, text: message, time: moment().format("hh:mm a").toString()});
    }
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(room).emit('message', { mod: 'Moderator', user: user, text: `${user.name} has left.`, time: moment().format("hh:mm a").toString() });
      io.to(room).emit('roomData', { room: room, users: getActiveUsers() });
    }
  })
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const router = require('./router');
const moment = require('moment');
const { addUser, updateUsername, updateUserColor, removeUser, getUser, getActiveUsers } = require('./userHelpers.js');
const { configureMessages } = require('./messageHelpers.js');

const PORT = process.env.PORT || 3000;

let currentUserConfig = null;

app.use(router);

io.on('connect', (socket) => {
  const room = `Nate's Chat Room`;
  let currUserID = currentUserConfig ? currentUserConfig.id : socket.id;

  socket.on('handleLocalStorage', (localStorage) => {
    console.log(localStorage);
    currentUserConfig = localStorage;
    currUserID = localStorage.id;
  })

  socket.on('join', (callback) => {
    const { error, user } = addUser({ id: currUserID }, currentUserConfig);
    if (error) return callback(error);

    socket.join(room);

    socket.emit('notification', { mod: user.name, user: user, text: `Hi ${user.name}, Welcome to ${room}!` });
    const messageObj = { mod: 'Moderator', user: user, text: `${user.name} has joined the room!`, time: moment().format("hh:mm a").toString() };
    const chatHistory = configureMessages(messageObj);
    io.to(room).emit('message', messageObj, chatHistory);
    io.to(room).emit('roomData', { room: room, users: getActiveUsers() });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    let user = getUser(currUserID);
    let messageObj;
    let chatHistory;

    if (message.trim().startsWith('/name ')) {
      const newNameCmd = message.trim().split(' ');
      const updatedName = newNameCmd[1];
      message = `${user.name} has changed their name to '${updatedName}'!`;
      const updatedUser = updateUsername(currUserID, updatedName);
      if (!updatedUser) message = `The name '${updatedName}' has already been taken.`;
      messageObj = { mod: 'Moderator', user: user, text: message, newName: updatedUser.name, time: moment().format("hh:mm a").toString(), users: getActiveUsers() };
      chatHistory = configureMessages(messageObj);
      io.to(room).emit('message', messageObj, chatHistory);
    } else if (message.trim().startsWith('/color ')) {
      const colorCmd = message.trim().split(' ');
      // check if value from color command is valid RGB/RRGGBB.
      if (!(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCmd[1]) || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCmd[1]))) {
        message = `@${user.name}, You entered an invalid color value. Use RGB or RRGGBB.`;
      } else {
        let colorOfName = colorCmd[1];
        if(colorOfName.charAt(0) !== '#') colorOfName = `#${colorOfName}`;
        updateUserColor(currUserID, colorOfName);
        message = `${user.name} has changed the color of their name to ${colorOfName}!`;
      }
      messageObj = { mod: 'Moderator', user: user, text: message, time: moment().format("hh:mm a").toString(), users: getActiveUsers() };
      chatHistory = configureMessages(messageObj);
      io.to(room).emit('message', messageObj, chatHistory);
    } else {
      messageObj = { user: user, text: message, time: moment().format("hh:mm a").toString() };
      chatHistory = configureMessages(messageObj);
      io.to(room).emit('message', messageObj, chatHistory);
    }
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(currUserID);
    if (user) {
      const messageObj = { mod: 'Moderator', user: user, text: `${user.name} has left.`, time: moment().format("hh:mm a").toString() };
      const chatHistory = configureMessages(messageObj);
      io.to(room).emit('message', messageObj, chatHistory);
      io.to(room).emit('roomData', { room: room, users: getActiveUsers() });
    }
  })
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

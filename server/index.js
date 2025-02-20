const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const router = require('./router');
const moment = require('moment-timezone');
const cors = require('cors');

const { addUser, updateUsername, updateUserColor, removeUser, getUser, getActiveUsers } = require('./userHelpers.js');
const { configureMessages, clearMessages } = require('./messageHelpers.js');

const PORT = process.env.PORT || 3000;

app.use(router);
app.use(cors());

io.on('connect', (socket) => {
  const room = `Nate's Chat Room`;
  let socketID = socket.id;
  let reconnectedUserConfig = null;
  
  socket.on('joinExistingUser', (existingUser) => {
    reconnectedUserConfig = existingUser;
  });

  socket.on('join', (callback) => {
    if (reconnectedUserConfig) socketID = reconnectedUserConfig.id;
    const { error, user } = addUser({ id: socketID }, reconnectedUserConfig);
    if (error) return callback(error);

    socket.join(room);

    socket.emit('notification', { mod: user.name, user: user, text: `Hi ${user.name}, Welcome to ${room}!` });
    const messageObj = { mod: 'Moderator', user: user, text: `${user.name} has joined the room!`, time: moment.tz('America/Denver').format('hh:mm a').toString(),  users: getActiveUsers() };
    const chatHistory = configureMessages(messageObj);
    io.to(room).emit('message', messageObj, chatHistory);
    io.to(room).emit('roomData', { room: room, users: getActiveUsers() });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    let user = getUser(socketID);
    let messageObj;
    let chatHistory;
    const timeSent = moment().tz('America/Denver').format('hh:mm a').toString();  // Calgary and Denver are both MST.
    
    if (message.length > 1600) {
      messageObj = { mod: 'Moderator', user: user, text: `@${user.name}, that message is too long.`, time: timeSent, users: getActiveUsers() };
      chatHistory = configureMessages(messageObj);
      io.to(room).emit('message', messageObj, chatHistory);
      return;
    }
    
    if (message.trim().startsWith('/name ')) {
      const newNameCmd = message.trim().split(' ');
      const updatedName = newNameCmd[1];
      message = `${user.name} has changed their name to '${updatedName}'!`;
      const updatedUser = updateUsername(socketID, updatedName);
      if (!updatedUser) message = `The name '${updatedName}' has already been taken.`;
      messageObj = { mod: 'Moderator', user: user, text: message, newName: updatedUser.name, time: timeSent, users: getActiveUsers() };
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
        updateUserColor(socketID, colorOfName);
        message = `${user.name} has changed the color of their name to ${colorOfName}!`;
      }
      messageObj = { mod: 'Moderator', user: user, text: message, time: timeSent, users: getActiveUsers() };
      chatHistory = configureMessages(messageObj);
      io.to(room).emit('message', messageObj, chatHistory);
    } else if (message === '/super_secret_admin_clear_command') {
      clearMessages();
      message = 'All messages have been cleared.';
      messageObj = { mod: 'Moderator', user: user, text: message, time: timeSent, users: getActiveUsers() };
      chatHistory = configureMessages(messageObj);
      io.to(room).emit('message', messageObj, chatHistory);
    } else {
      messageObj = { user: user, text: message, time: timeSent };
      chatHistory = configureMessages(messageObj);
      io.to(room).emit('message', messageObj, chatHistory);
    }
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socketID);
    if (user) {
      const messageObj = { mod: 'Moderator', user: user, text: `${user.name} has left.`, time: moment().tz('America/Denver').format('hh:mm a').toString() };
      const chatHistory = configureMessages(messageObj);
      io.to(room).emit('message', messageObj, chatHistory);
      const allCurrentUsers = getActiveUsers();
      io.to(room).emit('roomData', { room: room, users: allCurrentUsers });
    }
  })
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

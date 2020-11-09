const messages = [];

const addMessage = (message) => {
  messages.push(message);
};

const getMessages = () => messages;

// helper to ensure each message is sent & the chat history has at most 200 messages.
const configureMessages = (messageObj) => {
  addMessage(messageObj);
  let allMessages = getMessages();
  if (allMessages.length > 200) allMessages.shift();
  return allMessages;
}

module.exports = { configureMessages };

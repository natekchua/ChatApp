const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const users = [];

const addUser = ({ id }) => {
  const name = uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: '',
    style: 'capital'
  })
  if(users.find((user) => user.name === name)) return { error: 'Username is already taken.' };
  const user = { id, name };
  users.push(user);
  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getActiveUsers = () => users;

module.exports = {
  addUser,
  removeUser,
  getUser,
  getActiveUsers
};

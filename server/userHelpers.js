const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');
const users = [];

const addUser = ({ id }) => {
  const name = uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: '',
    style: 'capital'
  })
  const color = '#f57b42';
  if (users.find((user) => user.name === name)) return { error: 'Username is already taken.' };
  const user = { id, name, color };
  users.push(user);
  return { user };
}

const updateUsername = (id, name) => {
  const userToUpdate = getUser(id);
  if (users.find((user) => user.name === name)) return false;
  userToUpdate.name = name;
  return userToUpdate;
}

const updateUserColor = (id, color) => {
  const userToUpdate = getUser(id);
  userToUpdate.color = color;
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getActiveUsers = () => users;

module.exports = {
  addUser,
  updateUsername,
  updateUserColor,
  removeUser,
  getUser,
  getActiveUsers
};

const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');
const users = [];

const getRandomName = () => {
  return uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: '',
    style: 'capital'
  });
}

const addUser = ({ id }, reconnectedUser) => {
  let name
  let color = '#828282';
  if (!reconnectedUser) {
    name = getRandomName();
  } else {                  // handle a previous user who is logging back in.
    name = reconnectedUser.name;
    color = reconnectedUser.color;
  }
  if (users.find((user) => user.name === name)) {
    if (reconnectedUser) {  // assign random name to existing user if someone took the user's previous name.
      name = getRandomName();
    } else {
      return { error: 'Username is already taken.' };
    }
  }
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

const objectId = require('objectid');
const bcrypt = require('bcrypt');

const persistentDataAccess = require('../data-access/persistent');

const userStore = persistentDataAccess('users');

const saltRounds = 13;

const userManager = {
  createUser: async (username, email, password) => {
    const newUser = {
      id: objectId().toString(),
      username,
      email,
      password,
    };
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      newUser.password = hash;
      userStore.create(newUser);
    });
    return newUser;
  },
  getAllUsers: async () => {
    const allUsers = await userStore.all();
    return allUsers;
  },
};

module.exports = userManager;

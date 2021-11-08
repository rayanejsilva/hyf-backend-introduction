const crypto = require('crypto');

const persistentDataAccess = require('../data-access/persistent');

const userStore = persistentDataAccess('users');

const userManager = {
  createUser: async (username, email, password) => {
    const user = {
      username,
      email,
      password,
    };
    await userStore.create(user);
    console.log(`user logic: ${user}`);
    return user;
  },
  hashPassword: (input) => {
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    return hash;
  },
  getAllUsers: async () => {
    const allUsers = await userStore.all();
    return allUsers;
  },
};

module.exports = userManager;

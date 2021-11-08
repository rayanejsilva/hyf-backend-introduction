const persistentDataAccess = require('../data-access/persistent');

const userStore = persistentDataAccess('users');
const hashPassword = require('../utils/hash');

const userManager = {
  createUser: async (username, email, password) => {
    const hashedPassword = hashPassword(`${username}.${password}`);
    const user = {
      username,
      email,
      password: hashedPassword,
    };
    const allUsers = await userStore.all();

    const userExists = allUsers.find(
      (newUser) => newUser.username === username,
    );

    if (userExists) {
      throw new Error('Sorry, this user already exists');
    }
    await userStore.create(user);
    return user;
  },
  getAllUsers: async () => {
    const allUsers = await userStore.all();
    return allUsers;
  },
};

module.exports = userManager;

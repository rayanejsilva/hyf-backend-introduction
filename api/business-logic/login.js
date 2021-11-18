const bcrypt = require('bcrypt');

const persistentDataAccess = require('../data-access/persistent');

const generateToken = require('../utils/generateToken');

const userStore = persistentDataAccess('users');

const loginManager = {
  comparePassword: async (email, password) => {
    const dataSubmittedByUser = {
      email,
      password,
    };
    const allUsers = await userStore.all();
    const registeredUserData = allUsers.find(
      (user) => user.email === dataSubmittedByUser.email,
    );
    bcrypt.compare(
      dataSubmittedByUser.password,
      registeredUserData.password,
      (err, result) => {
        if (result) {
          console.log('Valid password', result);
        } else {
          console.error('Invalid', err);
        }
      },
    );
    const token = generateToken(registeredUserData);
    return { token };
  },
};

module.exports = loginManager;

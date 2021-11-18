// eslint-disable-next-line filenames/match-regex

// eslint-disable-next-line filenames/match-regex
const userManager = require('../business-logic/register');

// eslint-disable-next-line consistent-return
const validateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send('Email and password are required to login!');
      return;
    }
    const allUsers = await userManager.getAllUsers();
    const userMatch = allUsers.find((user) => req.body.email === user.email);
    if (!userMatch) {
      res.status(400).json({
        message: 'Invalid email or password',
      });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred trying to process your request',
    });
  }
};

module.exports = validateLogin;

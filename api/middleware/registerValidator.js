// eslint-disable-next-line filenames/match-regex
const userManager = require('../business-logic/register');

// eslint-disable-next-line consistent-return
const validateUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res
        .status(400)
        .send('Please, enter a username, email and password to sing-up!');
    } else {
      // check if the user already exists
      const allUsers = await userManager.getAllUsers();
      const userMatch = allUsers.find((user) => req.body.email === user.email);
      if (userMatch) {
        return res.status(400).json({
          message: 'This email address is already being used',
        });
      }
      next();
    }
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred trying to process your request',
    });
  }
};

module.exports = validateUser;

const userManager = require('../business-logic/register');

const registerController = {
  get: async (req, res) => {
    try {
      const users = await userManager.getAllUsers();
      res.send(JSON.stringify(users, null, 2));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  post: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await userManager.createUser(username, email, password);
      res
        .status(200)
        .json(
          `Congratulation ${user.username}, your account has been successfully created!`,
        );
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = registerController;

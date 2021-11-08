const userManager = require('../business-logic/auth');

const authController = {
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
      const { body } = req;
      const { username, email, password } = body;
      console.log(body);

      if (!username || !email || !password) {
        res
          .status(400)
          .send('Please, enter a username, email and password to sign up!');
      }
      const hashedPassword = userManager.hashPassword(password);
      const user = await userManager.createUser(
        username,
        email,
        hashedPassword,
      );
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

module.exports = authController;

const express = require('express');
const channelRoutes = require('./channels');
const messageRoutes = require('./messages');
const registerRoutes = require('./register');
const loginRoutes = require('./login');
const channelManager = require('../business-logic/channels');
const messageManager = require('../business-logic/messages');
const loginValidator = require('../middleware/loginValidator');
const authenticateToken = require('../middleware/authJwt');

// require routes files

const router = express.Router();
router.use('/channels/:channelId', async (req, res, next) => {
  try {
    const channel = await channelManager.getChannel(req.params.channelId);
    req.channel = channel;
    next();
  } catch (error) {
    res.status(400).send({ message: 'ChannelId provided could not be found' });
  }
});

router.use('/messages/:messageId', async (req, res, next) => {
  try {
    const message = await messageManager.getMessage(req.params.messageId);
    req.message = message;
    next();
  } catch (error) {
    res.status(400).send({ message: 'MessageId provided could not be found' });
  }
});
router.use('/channels', channelRoutes);
router.use('/', messageRoutes);
// use routes with this router
router.use('/register', registerRoutes);
router.use('/login', loginValidator);
router.use('/login', authenticateToken);
router.use('/login', loginRoutes);

// export the routes
module.exports = router;

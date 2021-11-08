const express = require('express');
const channelRoutes = require('./channels');
const messageRoutes = require('./messages');
const registerRoutes = require('./register');
const channelManager = require('../business-logic/channels');
const messageManager = require('../business-logic/messages');

// require routes files

const router = express.Router();
// use routes with this router

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
router.use('/register', registerRoutes);
// export the routes
module.exports = router;

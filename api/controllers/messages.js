const messageManager = require('../business-logic/messages');

const messageController = {
  get: async (req, res) => {
    // returns all messages currently in the system
    try {
      const messages = await messageManager.getAllMessages();
      res.send(JSON.stringify([messages]));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getMessagesForChannel: async (req, res) => {
    // returns the messages that belong in the channel with the specified id
    // passed as /api/channels/:channelId/messages
    try {
      const { channelId } = res.params;
      const messages = await messageManager.getMessagesForChannel(channelId);
      res.send(JSON.stringify([messages]));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  put: async (req, res) => {
    // updates the messages with the specified id
    // passed as /api/messages/:messageId
    try {
      const { messageId } = req.params;
      const newData = req.body;
      if (newData.id !== messageId) {
        throw Error('Cannot update the message ID!');
      }
      await messageManager.updateMessage(newData);
      res.status(200).send(JSON.stringify([newData]));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  post: async (req, res) => {
    // creates a new message based on the passed body

    res.send('Not yet implemented');
  },
  delete: async (req, res) => {
    // deleted the message with the specified id
    // passed as /api/messages/:messageId

    res.send('Not yet implemented');
  },
};

module.exports = messageController;

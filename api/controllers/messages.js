const messageManager = require('../business-logic/messages');

const messageController = {
  get: async (req, res) => {
    // returns all messages currently in the system
    try {
      const messages = await messageManager.getAllMessages();
      res.send(JSON.stringify(messages, null, 2));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getMessagesForChannel: async (req, res) => {
    // returns the messages that belong in the channel with the specified id
    // passed as /api/channels/:channelId/messages
    try {
      const { channelId } = req.params;
      const messages = await messageManager.getMessagesForChannel(channelId);
      res.json(messages);
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
    try {
      const { user } = req.body;
      const content = req.body.text;
      const { channelId } = req.params;
      const message = await messageManager.createMessage(
        user,
        content,
        channelId,
      );
      res.status(200).send(JSON.stringify(message));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  delete: async (req, res) => {
    // deleted the message with the specified id
    // passed as /api/messages/:messageId
    try {
      const { messageId } = req.params;
      await messageManager.removeMessage(messageId);
      // eslint-disable-next-line prettier/prettier
      res.status(200).send(
        JSON.stringify({
          message: `Message with id ${messageId} was successfully deleted!`,
        }),
      );
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = messageController;

const objectId = require('objectid');

const persistentDataAccess = require('../data-access/persistent');

const messageStore = persistentDataAccess('messages');

const messageManager = {
  createMessage: async (user, messageContent, channelId) => {
    const message = {
      id: objectId().toString(),
      text: messageContent,
      user,
      channelId,
      date: new Date(),
    };
    await messageStore.create(message);
    return message;
  },
  updateMessage: async (message) => {
    const update = await messageStore.update(message.id, message);
    return update;
  },
  removeMessage: async (messageId) => {
    await messageStore.remove(messageId);
    return true;
  },
  getMessage: async (messageId) => {
    const message = await messageStore.read(messageId);
    return message;
  },
  getAllMessages: async () => {
    const allMessages = await messageStore.all();
    return allMessages;
  },
  getMessagesForChannel: async (channelId) => {
    const filteredMessages = [];
    const allMessages = await messageStore.all();
    for (let i = 0; i < allMessages.length; i++) {
      const message = allMessages[i];
      if (message.channelId === channelId) {
        filteredMessages.push(message);
      }
    }
    return filteredMessages;
  },
};

module.exports = messageManager;

const objectId = require('objectid');

const persistentDataAccess = require('../data-access/persistent');

const channelStore = persistentDataAccess('channels');

const channelManager = {
  createChannel: async (channelName) => {
    const channel = {
      id: objectId().toString(),
      name: channelName,
    };
    await channelStore.create(channel);
    return channel;
  },
  updateChannel: async (channel) => {
    const success = await channelStore.update(channel.id, channel);
    if (!success) {
      throw new Error("Cannot update a channel that doesn't exist!");
    }
    return channel;
  },
  removeChannel: async (channelId) => {
    await channelStore.remove(channelId);
    return true;
  },
  getChannel: async (channelId) => {
    const channel = await channelStore.read(channelId);
    if (!channel) {
      throw new Error(`Could not find channel with id ${channelId}!`);
    }
    return channel;
  },
  getAllChannels: async () => {
    const allChannels = await channelStore.all();
    return allChannels;
  },
};

module.exports = channelManager;

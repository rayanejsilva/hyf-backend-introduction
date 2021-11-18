import { insertOrUpdate, find } from '../index.js';

async function performFetch(path) {
  const URL = `${window.location.origin}/api/${path}`;

  const encodedURL = encodeURI(URL);
  const response = await fetch(encodedURL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}\n-> ${URL}`);
  }
  const data = await response.json();

  return data;
}

async function performPost(path, body) {
  const URL = `${window.location.origin}/api/${path}`;

  const encodedURL = encodeURI(URL);
  const response = await fetch(encodedURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: state.token === undefined ? '' : `Bearer ${state.token}`,
      Username: state.username === undefined ? '' : state.username,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}\n-> ${URL}`);
  }
  const data = await response.json();

  return data;
}
export const register = async (username, password) => {
  return await performPost('register', {
    username,
    password,
  });
};

export const login = async (username, password) => {
  return await performPost('login', {
    username,
    password,
  });
};

export const fetchChannels = async () => {
  return await performFetch('channels');
};

export const fetchMessagesForChannel = async (channelId) => {
  if (!channelId) {
    return [];
  }
  return await performFetch(`channels/${channelId}/messages`);
};

export const postChannel = async (channelName) => {
  return await performPost('channels', { name: channelName });
};

export const postMessage = async (message) => {
  return await performPost(`channels/${find('currentChannelId')}/messages`, {
    user: find('username'),
    text: message,
  });
};

/* eslint-disable filenames/match-regex */
const jwt = require('jsonwebtoken');

require('dotenv').config();
const jwtKey = process.env.JWT_KEY;
const verifyAccessToken = async (username, token) => {
  try {
    const payload = jwt.verify(token, jwtKey);
    if (payload.username !== username) {
      return {
        success: false,
        message: 'Invalid Access Token!',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = verifyAccessToken;

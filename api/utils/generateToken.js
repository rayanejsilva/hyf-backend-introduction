/* eslint-disable filenames/match-regex */
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtKey = process.env.JWT_KEY;

const generateToken = (user) => {
  const payload = {
    userId: `${user.id}`,
    username: `${user.username}`,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day
  };

  const token = jwt.sign(payload, jwtKey);
  return token;
};

module.exports = generateToken;

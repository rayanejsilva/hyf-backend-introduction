const crypto = require('crypto');

const hashPassword = (input) => {
  const hashedPassword = crypto
    .createHash('sha256')
    .update(input)
    .digest('hex');
  return hashedPassword;
};

module.exports = hashPassword;

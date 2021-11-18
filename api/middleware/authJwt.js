/* eslint-disable filenames/match-regex */
const verifyAccessToken = require('../utils/verifyToken');

const authenticateToken = async (req, res, next) => {
  const headersValues = req.headers.authorization;
  if (!headersValues) {
    res.status(401).json({
      message: 'Missing authorization header.',
    });
    return;
  }

  const headerParts = headersValues.split(' ');

  if (headerParts.length !== 2) {
    res.status(401).json({
      message: 'Bad authorization header',
    });
    return;
  }

  if (headerParts[0] !== 'Bearer') {
    res.status(401).json({
      message: 'Scheme must be Bearer.',
    });
    return;
  }

  const token = headerParts[1];
  const user = req.body.username;
  const authResult = await verifyAccessToken(user, token);

  if (!authResult.success) {
    res.status(401).json({
      message: 'Invalid or expired token.',
    });
    return;
  }

  next();
};

module.exports = authenticateToken;

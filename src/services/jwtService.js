require('dotenv/config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = {
  createToken: (payload) => {
    const { password: passDb, ...userWithoutPassword } = payload.dataValues;
    const token = jwt.sign(userWithoutPassword, JWT_SECRET, JWT_CONFIG);
    return token;
  },

  validateToken: (token) => {
    try {
      const userData = jwt.verify(token, JWT_SECRET);
      return userData;
    } catch (error) {
      const e = new Error('Expired or invalid token');
      e.name = 'UnauthorizedError';
      throw e;          
    }
    },
};

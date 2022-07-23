const Joi = require('joi');
const { User } = require('../database/models');
const { createToken } = require('./jwtService');

module.exports = {
  validateLoginBody: (loginBody) => {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid fields',
        'string.empty': 'Some required fields are missing',
      }),
      password: Joi.string().required().messages({
        'string.empty': 'Some required fields are missing',
      }),
    });

    const { error, value } = schema.validate(loginBody);

    if (error) throw error;
    
    return value;
  },

  login: async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    
    if (!user || user.password !== password) {
      const error = new Error('Invalid fields');
      error.name = 'ValidationError';
      throw error;        
    } 
    const token = createToken(user);
    return token;
  },
};

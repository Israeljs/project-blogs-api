const Joi = require('joi');
const { User } = require('../database/models');

module.exports = {
  validateUserBody: (userBody) => {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      image: Joi.string().required(),
    });

    const { error, value } = schema.validate(userBody);

    if (error) throw error;
    
    return value;
  },
  addUser: async (displayName, email, password, image) => {
    const [user, created] = await User.findOrCreate({
      where: { displayName, email, password, image },
    });
    if (!created) {
      const error = new Error('User already registered');
      error.name = 'ConflictError';
      throw error;
    }    
    return user;
  },
  getUsers: async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  },
  getUserById: async (id) => {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      const error = new Error('User does not exist');
      error.name = 'NotFoundError';
      throw error;
    }    
    return user;
  },
};

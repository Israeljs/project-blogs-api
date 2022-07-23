const userService = require('../services/userService');
const { createToken } = require('../services/jwtService');

module.exports = {
  addUser: async (req, res) => {
    const { displayName, email, password, image } = await userService.validateUserBody(req.body);
    const user = await userService.addUser(displayName, email, password, image);
    const token = createToken(user);
    return res.status(201).json({ token });
  },
  getUsers: async (_req, res) => {
    const users = await userService.getUsers();
    return res.status(200).json(users);
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.status(200).json(user);
  },
  removeMe: async (req, res) => {
    const { id } = req.user;
    const user = await userService.getUserById(id);
    await user.destroy();
    return res.status(204).end();
  },
};

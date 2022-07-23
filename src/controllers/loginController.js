const authService = require('../services/authService');

module.exports = {
  login: async (req, res) => {
    const { email, password } = authService.validateLoginBody(req.body);

    const token = await authService.login(email, password);

    return res.status(200).json({ token });
  },
};

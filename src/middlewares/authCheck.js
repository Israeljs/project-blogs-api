const { validateToken } = require('../services/jwtService');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  
  const userData = validateToken(authorization);
  
  req.user = userData; // criando uma nova chave no objeo req e passando os dados do usuário.
  next();
};

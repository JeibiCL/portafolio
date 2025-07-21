const jwt = require('jsonwebtoken');

const authMiddleware = async (ctx, next) => {
  const authHeader = ctx.headers['authorization'];

  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { error: 'Token no proporcionado' };
    return;
  }

  const token = authHeader.split(' ')[1]; // Espera "Bearer <token>"

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Token mal formado' };
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = decoded; // guardar info usuario en el contexto
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Token inválido o expirado' };
  }
};

module.exports = authMiddleware;

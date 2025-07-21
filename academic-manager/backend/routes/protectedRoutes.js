const Router = require('@koa/router');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

router.get('/perfil', authMiddleware, async (ctx) => {
  // Accede a los datos del usuario en ctx.state.user
  ctx.body = {
    mensaje: 'Acceso a ruta protegida',
    usuario: ctx.state.user,
  };
});

module.exports = router;

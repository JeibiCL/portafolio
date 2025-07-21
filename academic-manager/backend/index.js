const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');


dotenv.config();

const app = new Koa();
app.use(bodyParser());

app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());
app.use(protectedRoutes.routes());
app.use(protectedRoutes.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión con la base de datos exitosa');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados');
  })
  .catch((err) => {
    console.error('rror al conectar o sincronizar:', err);
  });

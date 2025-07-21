const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (ctx) => {
  const { nombre, correo, contraseña } = ctx.request.body;

  const usuarioExistente = await Usuario.findOne({ where: { correo } });
  if (usuarioExistente) {
    ctx.status = 400;
    ctx.body = { error: 'El correo ya está registrado' };
    return;
  }

  const hash = await bcrypt.hash(contraseña, 10);

  const nuevoUsuario = await Usuario.create({ nombre, correo, contraseña: hash });

  ctx.body = { mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario };
};

exports.login = async (ctx) => {
  const { correo, contraseña } = ctx.request.body;

  const usuario = await Usuario.findOne({ where: { correo } });

  if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
    ctx.status = 401;
    ctx.body = { error: 'Credenciales inválidas' };
    return;
  }

  const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });

  ctx.body = { mensaje: 'Login exitoso', token };
};

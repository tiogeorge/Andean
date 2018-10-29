const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const usuarioController = {};
const BCRYPT_SALT_ROUNDS = 10;

usuarioController.getUsuarios = async (req, res, next) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

usuarioController.createUsuario = async (req, res, next) => {
    var salt = bcrypt.genSaltSync();
    var password = bcrypt.hashSync(req.body.contrasena, salt);
    const usuario = new Usuario({
        correo: req.body.correo,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        contrasena: password
    });
    await usuario.save();
    res.json({status: 'Usuario creado'});
};

usuarioController.getUsuario = async (req, res, next) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json(usuario);
};

usuarioController.editUsuario = async (req, res, next) => {
    const { id } = req.params;
    const usuario = {
      correo: req.body.correo,
      tipo_documento: req.body.tipo_documento,
      numero_documento: req.body.numero_documento,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      contrasena: req.body.contrasena
    };
    await Usuario.findByIdAndUpdate(id, {$set: usuario}, {new: true});
    res.json({status: 'Usuario actualizado'});
};

usuarioController.deleteUsuario = async (req, res, next) => {
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({status: 'Usuario eliminado'});
};

module.exports = usuarioController;
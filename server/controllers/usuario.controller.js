const Usuario = require('../models/usuario');

const usuarioController = {};

usuarioController.getUsuarios = async (req, res, next) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

usuarioController.createUsuario = async (req, res, next) => {
    const usuario = new Usuario({
        correo: req.body.correo,
        tipo_documento: req.body.tipo_documento,
        numero_documento: req.body.numero_documento,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        contrasena: req.body.contrasena
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
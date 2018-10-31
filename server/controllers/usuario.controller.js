const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const usuarioController = {};
const salt = bcrypt.genSaltSync();

usuarioController.crearUsuario = async (req, res, next) => {
    const user = await Usuario.find( { correo : req.body.correo } );
    if (user.length != 0){
        res.json({exito: false, msg: 'Usuario ya existe'});
    }else{
        var pass = bcrypt.hashSync(req.body.password, salt);
        const usuario = new Usuario({
            correo: req.body.correo,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            password: pass
        });
        await usuario.save();
        res.json({exito: true, msg: 'Usuario creado'});
    }
};

usuarioController.loginUsuario = async(req, res, next) => {
    //const usuario = await Usuario.find({correo: req.body.correo});
    var login = bcrypt.compareSync(req.body.password, usuario.password); 
    res.json({status: 'Usuario logeado', estado: 'login'});
}

module.exports = usuarioController;
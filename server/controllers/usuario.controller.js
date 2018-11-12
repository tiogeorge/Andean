const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const usuarioController = {};
const salt = bcrypt.genSaltSync();

usuarioController.crearUsuario = async (req, res, next) => {
  const user = await Usuario.find({
    correo: req.body.correo
  });
  if (user.length != 0) {
    res.json({
      exito: false,
      msg: 'Usuario ya existe'
    });
  } else {
    var pass = bcrypt.hashSync(req.body.password, salt);
    const usuario = new Usuario({
      correo: req.body.correo,
      nombres: req.body.nombres.toUpperCase(),
      apellidos: req.body.apellidos.toUpperCase(),
      password: pass,
      promociones: req.body.promociones
    });
    await usuario.save();
    res.json({
      exito: true,
      msg: 'Usuario creado'
    });
  }
};

usuarioController.loginUsuario = async (req, res, next) => {
  const usuario = await Usuario.find({
    correo: req.body.correo
  });
  if (usuario.length == 0) {
    res.json({
      status: 'El usuario no existe',
      estado: false
    });
  } else {
    console.log(req.body.password);
    console.log(usuario[0].password);
    var login = bcrypt.compareSync(req.body.password, usuario[0].password);
    if (!login) {
      res.json({
        status: 'Su usuario y/o contraseña son incorrectos.',
        estado: false
      });
    } else {
      req.session.cont = req.session.cont ? req.session.cont + 1 : 1;
      res.json({
        status: 'Iniciando sesión.',
        estado: true
      });
    }
  }
}

usuarioController.loginAdmin = async (req, res, next) => {
  req.getConnection(function (error, conn) {
    var consulta = "call spuPrin_IniciarSesionUsuario(?,?,?)";
    var valores = [req.body.usuario, req.body.password, 'web'];
    conn.query(consulta, valores, function(err, rows, fields) {
      if(err) throw err        
      // if user not found
      // Se obtiene mensaje, idEmpleado, Nombres, idTipoUusario
      if (results[0] == 'HECHO'){
        res.json({
          status: 'Iniciando sesión',
          estado: true
        });
      }else {
        res.json({
          status: 'Usuario y/o contraseña incorrecta.',
          estado: false
        });
      }
    })
  });
}

module.exports = usuarioController;
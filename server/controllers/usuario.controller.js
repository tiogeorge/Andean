const Usuario           = require('../models/usuario');
const bcrypt            = require('bcrypt');
const salt              = bcrypt.genSaltSync();
const jwt               = require('jsonwebtoken');
const usuarioController = {};
process.env.JWT_SECRET  = 'andeantechnology';

usuarioController.actualizarUsuario = async (req, res, next) => {
  try {
    const user = {
      tipoDocumento: req.body.tipoDocumento,
      numeroDocumento: req.body.numeroDocumento,
      nombres: req.body.nombres.toUpperCase(),
      apellidos: req.body.apellidos.toUpperCase(),
      promociones: req.body.promociones,
      sexo: req.body.sexo,
      fechaNacimiento: req.body.fechaNacimiento
    };
    await Usuario.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: user
    }, {
      new: false
    }, function(err, usuario){
      if(err){
        res.json({
          status: false,
          error: 'Se produjo el siguiente error' + err
        });
      }else{
          res.json({
            status: true,
            msg: 'Los datos del usuario se han actualizado con éxito'
          });
        }
      })
  } catch (err) {
    res.json({
      status: false,
      error: "Se produjo un error al actualizar los datos del usuario: " + err
    });
  }
};

usuarioController.crearUsuario = async (req, res, next) => {
  Usuario.findOne({correo: req.body.correo}, function(err, usuario){
    if(err){
      res.json({
        status: false,
        error: 'Se produjo el siguiente error: ' + err
      });
    } else {
      if (usuario){
        res.json({
          status: false,
          error: 'El correo electrónico ya esta siendo usado'
        });
      } else {
        var pass = bcrypt.hashSync(req.body.password, salt);
        var usuarioModel = new Usuario({
          correo: req.body.correo,
          nombres: req.body.nombres.toUpperCase(),
          apellidos: req.body.apellidos.toUpperCase(),
          password: pass,
          promociones: req.body.promociones,
          tipoDocumento: req.body.tipoDocumento,
          numeroDocumento: req.body.numeroDocumento,
          sexo: req.body.sexo,
          fechaNacimiento: req.body.fechaNacimiento
        });
        usuarioModel.save(function(err, usuario){
          usuario.token = jwt.sign(usuario.toJSON(), process.env.JWT_SECRET);
          usuario.save(function(err, userToken){
            if(err){
              res.json({
                status: false,
                error: 'Se produjo el siguiente error: ' + err 
              });
            } else {
              res.json({
                status: true,
                msg: 'El usuario ha sido creado con éxito',
                token: userToken.token
              });
            }        
          });
        });
      }
    }
  })
};

usuarioController.eliminarUsuario = async (req, res, next) => {
  await Usuario.remove({
    id: req.params.id
  }, function(err){
    if(err){
      res.json({
        status: false,
        error: 'Se produjo un error al eliminar el usuario: ' + err
      });
    }else{
        res.json({
          status: true,
          msg: 'El usuario ha sido eliminado con éxito'
        });
      }
    });
};

usuarioController.listarUsuarios = async (req, res, next) => {
  const usuarios = await Usuario.find(function(err, usuarios){
    if(err){
      res.json({
        status: false,
        error: 'Se produjo el siguiente error: ' + err
      });
    }else{
      res.json(usuarios);
    }
  })
};

usuarioController.loginAdmin = async (req, res, next) => {
  req.getConnection(function (error, conn) {
    var consulta = "call spuPrin_IniciarSesionUsuario(?,?,?)";
    var valores = [req.body.usuario.toUpperCase(), req.body.password, 'web'];
    conn.query(consulta, valores, function (err, results) {
      if (err) throw err
      // if user not found
      // Se obtiene mensaje, idEmpleado, Nombres, idTipoUusario
      if (results[0][0].Mensaje == 'HECHO') {
        req.session.cont = req.session.cont ? req.session.cont + 1 : 1;
        req.session.idEmpleado = req.session.idEmpleado ? req.session.idEmpleado : results[0][0].idEmpleado;
        req.session.usuario = req.session.usuario ? req.session.usuario : results[0][0].Nombres;
        req.session.idTipoUsuario = req.session.idTipoUsuario ? req.session.idTipoUsuario : results[0][0].idTipoUsuario;
        res.json({
          status: true,
          msg: 'Iniciando sesión'
        });
      } else {
        res.json({
          status: false,
          errror: 'El usuario y/o contraseña son incorrectas.'
        });
      }
    })
  });
};

usuarioController.loginUsuario = async (req, res, next) => {
  Usuario.findOne({correo: req.body.correo}, function(err, usuario){
    if(err){
      res.json({
        status: false,
        error: 'Se produjo el siguiente error: ' + err
      });
    } else {
      if (usuario){
        var login = bcrypt.compareSync(req.body.password, usuario.password);
        if (login){
          res.json({
            status: true,
            msg: 'Iniciando sesión',
            token: usuario.token
          });
        } else {
          res.json({
            status: false,
            error: 'Contraseña incorrecta'
          })
        }
      } else {
        res.json({
          status: false,
          error: 'El usuario no existe'
        });
      }
    }
  })
};

usuarioController.obtenerUsuario = async (req, res, next) => {
  Usuario.findOne({ token: req.params.id}, function(err, usuario){
    if(err){
      res.json({
        status: false,
        error: 'Se produjo el siguiente error: ' + err
      });
    }else{
      if(usuario){
        res.json({
          status: true,
          data: usuario
        });
      }else {
        res.json({
          status: false,
          error: 'No se encontró al usuario'
        })
      }
      
    }
  })
};

module.exports = usuarioController;
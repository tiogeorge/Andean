const Articulo          = require('../models/articulo');
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

usuarioController.agregarArticulo = async (req, res, next) => {
  if(req.session.token){
    await Usuario.findOne({ token: req.session.token }, function(err, usuario){
      if(err){
        res.json({
          status: false,
          error: 'Se produjo un error al obtener el usuario'
        });
      } else {
        if(usuario){
          var carritoArticulo = [];
          var existeArticulo = false;
          if (usuario.carrito){
            carritoArticulo = usuario.carrito;     
            for(var i = 0; i < carritoArticulo.length; i++){
              if(carritoArticulo[i] == req.params.url){
                existeArticulo = true;
                break;
              }
            }
          }
          if (existeArticulo){
            res.json({
              status: true,
              msg: 'El artículo ya está agregado en su carrito de compras'
            });
          } else {
            carritoArticulo.push(req.params.url);
            Usuario.findOneAndUpdate({
              token: req.session.token
            }, {
              $set : {carrito : carritoArticulo}
            }, {
              new: false
            }, function(err, usuarioArticulo){
              if(err){
                res.json({
                  status: false,
                  error: 'Se produjo error al agregar el artículo en tu carrito de compras'
                });
              } else {
                req.session.articulos = carritoArticulo;
                res.json({
                  status: true,
                  msg: 'El artículo se agregó con éxito en tu carrito de compras'
                });
              }
            });
          }       
        }     
      }
    });
  } else {
    var carritoArticulo = [];
    var existeArticulo = false;
    if (req.session.articulos){
      carritoArticulo = req.session.articulos;     
      for(var i = 0; i < carritoArticulo.length; i++){
        if(carritoArticulo[i] == req.params.url){
          existeArticulo = true;
          break;
        }
      }
      if(!existeArticulo){
        req.session.articulos.push(req.params.url);
      }
      res.json({
        status: true,
        msg: 'El artículo se ha agregado a tu carrito de compras exitosamente'
      })
    }  else {
      res.json({
        status: false,
        error: 'No se agregó el artículo al carrito de compras'
      })
    }
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
              });
            }        
          });
        });
      }
    }
  })
};

usuarioController.eliminarArticulo = async (req, res, next) => {
  if(req.session.token){
    await Usuario.findOne({
      token: req.session.token
    }, function( err, usuario){
      if (err){
        res.json({
          status: false,
          error: 'No se pudo obtener los datos del cliente'
        });
      } else {
        var carritoArticulos = usuario.carrito;
        var indice = 0;
        for(var i = 0; i < usuario.carrito.length; i++){
          if (usuario.carrito[i] == req.params.url){
            indice = i;
            break;
          }
        }
        carritoArticulos.splice(indice, 1);
        Usuario.findOneAndUpdate({
          token: req.session.token
        }, {
          $set : { carrito : carritoArticulos }
        }, function(err){
          if(err){
            res.json({
              status: false,
              error: 'Error al eliminar un articulo del carrito'
            });
          } else {
            req.session.articulos = carritoArticulos;
            res.json({
              status: true,
              msg: 'El artículo se ha eliminado exitosamente'
            });
          }
        })
      }
    });
  } else {
    var carritoArticulo = [];
    if(req.session.articulos){
      carritoArticulo = req.session.articulos;
      var indice = 0;
      for(var i = 0; i < req.session.articulos.length; i++){
        if (req.session.articulos[i] == req.params.url){
          indice = i;
          break;
        }
      }
      carritoArticulo.splice(indice, 1);
      req.session.articulos = carritoArticulo;
      res.json({
        status: true,
        msg: 'El artículo se ha eliminado exitosamente'
      });
    } else {
      res.json({
        status: false,
        error: 'No se pudo eliminar este artículo'
      });
    }
  }
};

usuarioController.eliminarTodoArticulos = async (req, res, next) => {
  console.log(req.session.articulos);
  if (req.session.token){
    await Usuario.findOneAndUpdate({
      token: req.session.token
    },{
      $set : {carrito : [] }
    } ,function(err) {
      if(err){
        res.json({
          status: false,
          error: 'Error al intentar eliminar el artículo del carrito de compras'
        });
      } else {
        res.json({
          status: true,
          msg: 'El carrito ha sido vaciado con éxito'
        });
      }
    });
  } else {
    req.session.articulos = [];
  }
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
          req.session.token = usuario.token;
          res.json({
            status: true,
            msg: 'Iniciando sesión',
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

usuarioController.obtenerCarrito = async (req, res, next) => {
  if(req.session.token) {
    Usuario.findOne({ token: req.session.token }, function(err, usuario) {
      if (err) {
        res.json({
          status: false,
          error: 'Ocurrió un error al obtener el carrito de compras del usuario'
        });
      } else {
        if (usuario) {
          res.json({
            status: true,
            msg: 'Se obtuvo los artículos del carrito de compras',
            data: usuario.carrito
          });
        } else {
          res.json({
            status: false,
            error: 'No se puedo obtener los datos del cliente'
          });
        }
      }
    })
  } else {
    if (req.session.articulos){
      res.json({
        status: true,
        msg: 'Se obtuvo el carrito de compras del invitado',
        data: req.session.articulos
      });
    } else {
      res.json({
        status: true,
        msg: 'El invitado no tiene elementos en su carrito de compras',
        data: []
      });
    }
  }
};

usuarioController.obtenerUsuario = async (req, res, next) => {
  if(req.session.token){
    Usuario.findOne({ token: req.session.token }, function(err, usuario) {
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
  } else {
    res.json({
      status: false,
      error: 'La sesión no está activada'
    });
  }
};

module.exports = usuarioController;
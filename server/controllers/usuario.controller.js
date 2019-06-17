const Articulo = require('../models/articulo');
const Precio = require('../models/equipos');
const Usuario = require('../models/usuario');
const NodeMailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();
const auth  = require('../routes/auth');
const usuarioController = {};


/**
 * Método que permite actualizar la información de un cliente
 */
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
    }, function (err, usuario) {
      if (err) {
        res.json({
          status: false,
          error: 'Se produjo el siguiente error' + err
        });
      } else {
        req.getConnection(function (error, conn) {
          var consulta = "call spWeb_ActualizarDatosCliente(?,?,?,?,?)";
          var valores = [usuario.numeroDocumento, usuario.nombres, usuario.apellidos, usuario.sexo, usuario.correo];
          conn.query(consulta, valores, function (err) {
            if (err) {
              res.json({
                status: false,
                error: 'Ocurrió un error al actualizar su usuario.'
              });
            } else {
              res.json({
                status: true,
                msg: 'Su información ha sido actualizada con éxito'
              });
            }
          })
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

/**
 * Método que permite agregar un artículo al carrito de compras
 */
usuarioController.agregarArticulo = async (req, res, next) => {
  console.log(req.userData);
  if (req.userData) {
    
    await Usuario.findOne({
      correo: req.userData.correo
    }, function (err, usuario) {
      if (err) {
        res.json({
          status: false,
          error: 'Se produjo un error al obtener los datos del usuario'
        });
      } else { // Usuario encontrado
        if (usuario) {
          console.log(usuario);
          var carritoArticulo = [];
          var existeArticulo = false;
          if (usuario.carrito) {
            carritoArticulo = usuario.carrito;
            for (var i = 0; i < carritoArticulo.length; i++) {
              // Si es igual el artículo y el equipo
              if (carritoArticulo[i].idArticulo == req.params.id && 
                  carritoArticulo[i].idEquipo == req.body.idequipo) {
                existeArticulo = true;
                break;
              }
            }
          }
          if (existeArticulo) {
            res.json({
              status: true,
              msg: 'El artículo ya está agregado en su carrito de compras'
            });
          } else {
            const articuloCarrito = {
              idArticulo: req.params.id,
              idEquipo: req.body.idequipo,
              cantidad: req.body.cantidad,
            };
            carritoArticulo.push(articuloCarrito);
            Usuario.findOneAndUpdate({
              correo:req.userData.correo
            }, {
              $set: {
                carrito: carritoArticulo
              }
            }, {
              new: false
            }, function (err) {
              if (err) {
                res.json({
                  status: false,
                  error: 'Se produjo un error al agregar el artículo en tu carrito de compras.'
                });
              } else {
                //req.session.articulos = carritoArticulo;
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
  } else { // Usuario que no ha iniciado sesión
    var carritoArticulo = [];
    var existeArticulo = false;
    const articuloCarrito = {
      idArticulo: req.params.id,
      idEquipo: req.body.idequipo,
      cantidad: req.body.cantidad,
    };
    if (req.session.articulos) {
      carritoArticulo = req.session.articulos;
      for (var i = 0; i < carritoArticulo.length; i++) {
        if (carritoArticulo[i].idArticulo == req.params.id && 
            carritoArticulo[i].idEquipo == req.body.idequipo) {
          existeArticulo = true;
          break;
        }
      }
      if (!existeArticulo) {
        req.session.articulos.push(articuloCarrito);
      }
      res.json({
        status: true,
        msg: 'El artículo se ha agregado a tu carrito de compras exitosamente'
      })
    } else {
      carritoArticulo.push(articuloCarrito);
      req.session.carrito = carritoArticulo;
      res.json({
        status: true,
        error: 'El artículo se ha agregado a tu carrito de compras exitosamente'
      })
    }
  }
};

/**
 * Método que permite crear un nuevo cliente
 */
usuarioController.crearUsuario = async (req, res, next) => {
  Usuario.findOne({
    correo: req.body.correo
  }, function (err, usuario) {
    if (err) {
      res.json({
        status: false,
        error: 'Se produjo el siguiente error: ' + err
      });
    } else {
      if (usuario) {
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
        usuarioModel.save(function (err, usuario) {
          usuario.token = jwt.sign(usuario.toJSON(), process.env.JWT_SECRET);
          usuario.save(function (err, userToken) {
            if (err) {
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

/**
 * Método que permite eliminar un artículo del carrito de compras
 */
usuarioController.eliminarArticulo = async (req, res, next) => {
  if (req.userData) {
    await Usuario.findOne({
      correo: req.userData.correo
    },{carrito: 1}, function (err, usuario) {
      if (err) {
        res.json({
          status: false,
          error: 'No se pudo obtener los datos del cliente'
        });
      } else {
        var carritoArticulos = usuario.carrito;
        var indice = 0;
        for (var i = 0; i < usuario.carrito.length; i++) {
          if (usuario.carrito[i].idArticulo == req.params.id) {
            indice = i;
            break;
          }
        }
        carritoArticulos.splice(indice, 1);
        Usuario.findOneAndUpdate({
          correo: req.userData.correo
        }, {
          $set: {
            carrito: carritoArticulos
          }
        }, function (err) {
          if (err) {
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
    if (req.session.articulos) {
      carritoArticulo = req.session.articulos;
      var indice = 0;
      for (var i = 0; i < req.session.articulos.length; i++) {
        if (req.session.articulos[i].idArticulo == req.params.id) {
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

/**
 * Método que elimina todos los artículos del carrito de compras
 */
usuarioController.eliminarTodoArticulos = async (req, res, next) => {
  if (req.userData) {
    await Usuario.findOneAndUpdate({
      correo: req.userData.correo
    }, {
      $set: {
        carrito: []
      }
    }, function (err) {
      if (err) {
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

/**
 * Método que permite eliminar un usuario
 */
usuarioController.eliminarUsuario = async (req, res, next) => {
  await Usuario.remove({
    id: req.params.id
  }, function (err) {
    if (err) {
      res.json({
        status: false,
        error: 'Se produjo un error al eliminar el usuario: ' + err
      });
    } else {
      res.json({
        status: true,
        msg: 'El usuario ha sido eliminado con éxito'
      });
    }
  });
};

/**
 * Método que permite listar todos los usuarios existentes
 */
usuarioController.listarUsuarios = async (req, res, next) => {
  const usuarios = await Usuario.find(function (err, usuarios) {
    if (err) {
      res.json({
        status: false,
        error: 'Se produjo el siguiente error: ' + err
      });
    } else {
      res.json(usuarios);
    }
  })
};

/**
 * Método que permite iniciar sesión como administrador
 */
usuarioController.loginAdmin = async (req, res, next) => {
  req.getConnection(function (error, conn) {
    if (error) {
      res.json({
        status: false,
        error: 'Error al conectar con la base de datos'
      });
    } else {
      var consulta = "call spuPrin_IniciarSesionUsuario(?,?,?)";
      var valores = [req.body.usuario.toUpperCase(), req.body.password, 'web'];
      conn.query(consulta, valores, function (err, results) {
        if (err) {
          res.json({
            status: false,
            error: 'El usuario y/o contraseña son incorrectos'
          })
        } else {
          // if user not found
          // Se obtiene mensaje, idEmpleado, Nombres, idTipoUusario
          if (results[0][0].Mensaje == 'HECHO') {
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
        }
      })
    }
  });
};

/**
 * Método que permite iniciar sesión como cliente
 */
usuarioController.loginUsuario = async (req, res, next) => {
  Usuario.findOne({
    correo: req.body.correo
  }, function (err, usuario) {
    if (err) {
      res.json({
        status: false,
        error: 'Se produjo el siguiente error: ' + err
      });
    } else {
      if (usuario) {
        var login = bcrypt.compareSync(req.body.password, usuario.password);
        if (login) {
          
          user={
            userId: usuario._id.toString(),
            correo: usuario.correo,      
            
          };
         // console.log(user);
          var token = auth.generarTokenPrivado(user);
          var refreshtoken = auth.generarRefreshToken(user);
          var timeexpirationtoken =auth.getExpirationToken();
          var timeexpirationrefreshtoken = auth.getExpirationRefreshToken();
          
          req.session.token = token;
          res.json({
            status: true,
            msg: 'Autentificacion Exitosa',                       
            session_token: token,
            refresh_token:  refreshtoken,
            session_token_exp: timeexpirationtoken,
            refresh_token_exp: timeexpirationrefreshtoken
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

/**
 * Método que permite obtener los artículos y planes de un carrito de compras
 */
usuarioController.obtenerCarrito = async (req, res) => {
  if (req.userData) {
    usuario = await Usuario.findOne({ correo:req.userData.correo}, {carrito : 1});
    const carrito = usuario.carrito;
    var carritoArticulos = new Array();
    for (var i = 0; i < carrito.length; i++) {
      var articulo = await Articulo.findOne({ idarticulo: carrito[i].idArticulo }, {titulo: 1, url: 1, 'equipos.precioventa' : 1, imagenes: 1, descuento: 1});
      //var precio = await Precio.findOne({nombreequipo: articulo.idprecio}, {planes: {$elemMatch : {nombreplan: 'PREPAGO ALTA'}}, 'planes.precio': 1});
      var articulocompleto = {
        id: carrito[i].idArticulo,
        idarticulo: carrito[i].idEquipo,
        titulo: articulo.titulo,
        url: articulo.url,
        cantidad: carrito[i].cantidad,     
        imagen: articulo.imagenes[0],
        precio: articulo.equipos[0].precioventa,
        descuento: articulo.descuento
      }
      carritoArticulos.push(articulocompleto);
    }
    res.json({
      status: true,
      msg: 'Se obtuvieron los artículos con éxito',
      data: carritoArticulos
    });
  } else {
    if (req.session.articulos) {
      const carrito = req.session.articulos;
      var carritoArticulos = new Array();
      for (var i = 0; i < carrito.length; i++) {
        var articulo = await Articulo.findOne({ idarticulo: carrito[i].idArticulo }, {titulo: 1, url: 1, 'equipos.precioventa': 1, imagenes: 1, descuento: 1});
        //var precio = await Precio.findOne({nombreequipo: articulo.idprecio}, {planes: {$elemMatch : {nombreplan: 'PREPAGO ALTA'}}, 'planes.precio': 1});
        var articulocompleto = {
          id: carrito[i].idArticulo,
          idarticulo: carrito[i].idEquipo,
          titulo: articulo.titulo,
          url: articulo.url,
          cantidad: carrito[i].cantidad,    
          imagen: articulo.imagenes[0],
          precio: articulo.equipos[0].precioventa,
          descuento: articulo.descuento
        }
        carritoArticulos.push(articulocompleto);
      }
      res.json({
        status: true,
        msg: 'Se obtuvieron los artículos con éxito',
        data: carritoArticulos
      });
    } else {
      res.json({
        status: false,
        error: 'El usuario no tiene un carrito de compras'
      });
    }
  }
};

/**
 * Método que permite obtener los datos de un usuario
 */
usuarioController.obtenerUsuario = async (req, res, next) => {
  console.log("INFORMECION DE USUARIOS RECIBIDA");
  console.log("correo del usuario: "+req.userData.correo);
  if(req.userData.correo){
    Usuario.findOne({ correo: req.userData.correo },{correo:1,nombres:1, apellidos:1} ,function (err, usuario) {
      console.log(usuario);
      if (err) {
        res.json({ status: false,error: 'Se produjo el siguiente error: ' + err});
      } else {
        if (usuario) {
          res.json({status: true, data: usuario});
        } else {
          res.json({status: false,error: 'No se encontró al usuario'});
        }
      }
    });
  }else{
    res.json({ status: false,error: 'No se recibio la informacion del cliente'});
  }
  
};
usuarioController.obtenerDatosUsuario = async (req,res)=>{
  if(req.userData.correo){
    Usuario.findOne({ correo: req.userData.correo },{tipoDocumento:1,numeroDocumento:1,promociones:1,fecha_afiliacion:1,correo:1,nombres:1, apellidos:1,carrito:1,fechaNacimiento:1,sexo:1} ,function (err, usuario) {
      console.log(usuario);
      if (err) {
        res.json({ status: false,error: 'Se produjo el siguiente error: ' + err});
      } else {
        if (usuario) {
          res.json({status: true, data: usuario});
        } else {
          res.json({status: false,error: 'No se encontró al usuario'});
        }
      }
    });
  }else{
    res.json({ status: false,error: 'No se recibio la informacion del cliente'});
  }
}
/**
 * Método que permite obtener el numero de documento
 */
usuarioController.obtenerDocUsuario = async (req, res) => {
  const documento = await Usuario.find({_id:req.params.id}).select('numeroDocumento');
  res.json(documento[0].numeroDocumento);
};


/**
 * Método que obtiene un usuario por su identificador de base de datos
 */
usuarioController.usuarioid = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
}

/**
 * Método que guarda el costo de envío en la sesión del cliente
 */
usuarioController.guardarEnvio = async (req, res) => {
  req.session.envio = req.body.envio;
  res.status(200).json({
    status: true,
    msg: 'Listos para procesar la compra'
  });
}

/**
 * Método que permite recuperar la contraseña mediante un correo electrónico
 */
usuarioController.recuperarContraseña = async (req, res) => {
  var transporter = NodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'zapata.gabriel.avi',
      pass: ''
    }
  });
  Usuario.findOne({
    correo: req.body.email
  }, function (err, usuario) {
    if (err) {
      res.json({
        status: false,
        error: 'El usuario no está registrado'
      });
    } else {
      const mailOptions = {
        from: `”El Tío George” <tioGeorge@gmail.com>`,
        to: req.body.email, // Cambia esta parte por el destinatario
        subject: req.body.asunto,
        html: `
        <h3>Recuperación de Contraseña</h3>
      <p>Hola ${usuario.nombres} ${usuario.apellidos} ,<strong> el Tío George</strong> se compadece de tu mala memoria y te da la clave para que recuperes tu contraseña. </p>
      <a href="https://latiendadeltiogeorge.herokuapp.com/cambiarPassword/${usuario.token}">Este link tambien es valido</a>
      <p>Atentatemente: <strong>El Tío George</strong></p>
      `
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          res.json({
            status: false,
            error: 'Ocurrió un error al enviar el mensaje. ' + err
          });
        } else {
          res.json({
            status: true,
            msg: 'El enlace para recuperar su contraseña ha sido enviado a su correo'
          });
        }
      });
    }
  });
}

usuarioController.cambiarPassword = async (req, res) => {
  Usuario.findOneAndUpdate({
    token: req.body.token
  }, {
    $set: {
      password: req.body.password
    }
  }, function (err, usuario) {
    if (err) {
      res.json({
        status: false,
        error: 'Se produjo un error al cambiar la contraseña. ' + err
      });
    } else {
      res.json({
        status: true,
        msg: 'Su contraseña ha sido cambiada con éxito'
      });
    }
  });
}

module.exports = usuarioController;

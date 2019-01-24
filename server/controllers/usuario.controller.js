const Articulo          = require('../models/articulo');
const Precio            = require('../models/equipos');
const Usuario           = require('../models/usuario');
const NodeMailer        = require('nodemailer');
const bcrypt            = require('bcryptjs');
const salt              = bcrypt.genSaltSync();
const jwt               = require('jsonwebtoken');
const usuarioController = {};
process.env.JWT_SECRET  = 'andeantechnology';

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

/**
 * Método que permite agregar un artículo al carrito de compras
 */
usuarioController.agregarArticulo = async (req, res, next) => {
  console.log(req.body);
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
              if(carritoArticulo[i].url == req.params.url){
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
            const articuloCarrito = {
              url: req.params.url, 
              tipoLinea: req.body.tipoLinea, 
              tipoPlan: req.body.tipoPlan, 
              nombrePlan: req.body.nombrePlan, 
              cuotas: req.body.cuotas
            };
            carritoArticulo.push(articuloCarrito);
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
    const articuloCarrito = {
      url: req.params.url, 
      tipoLinea: req.body.tipoLinea, 
      tipoPlan: req.body.tipoPlan, 
      nombrePlan: req.body.nombrePlan, 
      cuotas: req.body.cuotas
    };
    if (req.session.articulos){
      carritoArticulo = req.session.articulos;     
      for(var i = 0; i < carritoArticulo.length; i++){
        if(carritoArticulo[i].url == req.params.url){
          existeArticulo = true;
          break;
        }
      }
      if(!existeArticulo){
        req.session.articulos.push(articuloCarrito);
      }
      res.json({
        status: true,
        msg: 'El artículo se ha agregado a tu carrito de compras exitosamente'
      })
    }  else {
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

/**
 * Método que permite eliminar un artículo del carrito de compras
 */
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
          if (usuario.carrito[i].url == req.params.url){
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
        if (req.session.articulos[i].url == req.params.url){
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

/**
 * Método que permite eliminar un usuario
 */
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

/**
 * Método que permite listar todos los usuarios existentes
 */
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

/**
 * Método que permite iniciar sesión como administrador
 */
usuarioController.loginAdmin = async (req, res, next) => {
  req.getConnection(function (error, conn) {
    var consulta = "call spuPrin_IniciarSesionUsuario(?,?,?)";
    var valores = [req.body.usuario.toUpperCase(), req.body.password, 'web'];
    conn.query(consulta, valores, function (err, results) {
      if (err){
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
  });
};

/**
 * Método que permite iniciar sesión como cliente
 */
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

/**
 * Método que permite obtener los artículos y planes de un carrito de compras
 */
usuarioController.obtenerCarrito = async (req, res, next) => {
  if(req.session.token){
    usuario = await Usuario.findOne({token: req.session.token});
    const carrito = usuario.carrito;
    var carritoArticulos = new Array();
    for(var i = 0; i < carrito.length; i++){
      var precioArticulo;
      var articulo = await Articulo.findOne({url : carrito[i].url});
      var precio = await  Precio.findOne({nombreequipo: articulo.idprecio});
      for(var j = 0; j < precio.planes.length; j++){
        if(carrito[i].tipoLinea == 'PREPAGO'){
          if(carrito[i].tipoLinea == precio.planes[j].tipolinea && carrito[i].tipoPlan == precio.planes[j].tipoplan && carrito[i].cuotas == precio.planes[j].cuotas){
            precioArticulo = precio.planes[j];
          }
        }else {
          if(carrito[i].tipoLinea == precio.planes[j].tipolinea && carrito[i].tipoPlan == precio.planes[j].tipoplan && carrito[i].cuotas == precio.planes[j].cuotas && carrito[i].nombrePlan == precio.planes[j].nombreplan){
            precioArticulo = precio.planes[j];
          }
        }
      }
      carritoArticulos.push([articulo, precioArticulo]);
    }
    res.json({
      status: true,
      msg: 'Se obtuvieron los artículos con éxito',
      data: carritoArticulos
    });
  } else {
    if(req.session.articulos){
      const carrito = req.session.articulos;
      var carritoArticulos = new Array();
      for(var i = 0; i < carrito.length; i++){
        var precioArticulo;
        var articulo = await Articulo.findOne({url : carrito[i].url});
        var precio = await  Precio.findOne({nombreequipo: articulo.idprecio});
        for(var j = 0; j < precio.planes.length; j++){
          if(carrito[i].tipoLinea == 'PREPAGO'){
            if(carrito[i].tipoLinea == precio.planes[j].tipolinea && carrito[i].tipoPlan == precio.planes[j].tipoplan && carrito[i].cuotas == precio.planes[j].cuotas){
              precioArticulo = precio.planes[j];
            }
          }else {
            if(carrito[i].tipoLinea == precio.planes[j].tipolinea && carrito[i].tipoPlan == precio.planes[j].tipoplan && carrito[i].cuotas == precio.planes[j].cuotas && carrito[i].nombrePlan == precio.planes[j].nombreplan){
              precioArticulo = precio.planes[j];
            }
          }
        }
        carritoArticulos.push([articulo, precioArticulo]);
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
 * Método que permite obtner los datos de un elemento de un carrito
 */
usuarioController.obtenerArticuloCarrito = async(res, req) => {
  Articulo.findOne({url: req.body.url}, function(err, articulo) {
    if(err){
      res.json({
        status: false,
        error: 'Error al obtener el artículo'
      });
    } else {
      Precio.find({ nombreequipo: articulo.idprecio }, function(err, precio){
        if(err){
          res.json({
            status: false,
            error: 'No se obtuvo el precio'
          });
        } else {
          var preciosArticulo = [];
          for(var i = 0; i < precio.planes.length; i++){
            if(req.boyd.tipoLinea == 'PREPAGO'){
              if (precio.planes[i].tipolinea == req.body.tipoLinea &&
                precio.planes[i].tipoplan == req.body.tipoPlan){
                  preciosArticulo.push(precio.planes[i]);
                }
            } else {
              if (precio.planes[i].tipolinea == req.body.tipoLinea &&
                precio.planes[i].tipoplan == req.body.tipoPlan && 
                precio.planes[i].nombreplan == req.body.nombrePlan &&
                precio.planes[i].cuotas == req.body.cuotas){
                  preciosArticulo.push(precio.planes[i]);
                }
            }
          }
          res.json({
            status: true,
            msg: 'Todos los datos obtenidos correctamente',
            carrito: usuario.carrito,
            data: articulos,
            precio: precios,
            plan: preciosArticulo
          })
        }
      })
    }
  });
};

/**
 * Método que permite obtener los datos de un usuario
 */
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

/**
 * Método que obtiene un usuario por su identificador de base de datos
 */
usuarioController.usuarioid=async (req,res)=>{
  const usuario=await Usuario.findById(req.params.id);
  res.json(usuario);
}

/**
 * Método que guarda el costo de envío en la sesión del cliente
 */
usuarioController.guardarEnvio = async(req, res) =>{
  req.session.envio = req.body.envio;
  res.status(200).json({
    status: true,
    msg: 'Listos para procesar la compra'
  });
}

/**
 * Método que permite recuperar la contraseña mediante un correo electrónico
 */
usuarioController.recuperarContraseña = async(req, res) => {
  var transporter = NodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zapata.gabriel.avi', 
        pass: '' 
    }
  });
  Usuario.findOne({correo: req.body.email}, function(err, usuario){
    console.log('Correo encontrado');
    if(err){
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
      if (err){
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

usuarioController.cambiarPassword = async(req, res) => {
  Usuario.findOneAndUpdate({token: req.body.token}, {$set : {password: req.body.password}}, function(err, usuario){
    if(err){
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
const Conversacion = require('../models/conversacion');
const sesionController = {};

/**
 * Método que permite verificar si un usuario ha iniciado sesión
 */
sesionController.obtenerSesion = async(req, res, next) => {
  if (req.session.token){
    res.json({
      status : true,
      msg: 'La sesión ya está inicializada'
    });
  } else {
    res.json({
      status: false,
      error: 'No se encontró ninguna sesión activa'
    })
  }
};

/**
 * Método que verifica si un usuario administrativo ha iniciado sesión
 */
sesionController.obtenerSesionAdmin = async(req, res, next) => {
  if(req.session.idEmpleado){
    res.json({
      status: true,
      msg: 'La sesión ya está inicializada',
      dato: req.session.idEmpleado,
    });
  } else {
    res.json({
      status: false,
      error: 'El usuario no tiene una sesión activa'
    });
  }
};

/**
 * Método que permite eliminar la sesión de un administrador
 */
sesionController.eliminarSesionAdmin = async(req, res, next) => {
  if(req.session.idEmpleado){
    req.session.destroy( function(error){
      if(error){
        res.json({
          status: false,
          error: 'Ocurió un error al eliminar la sesión'
        });
      } else {
        res.json({
          status: true,
          msg: 'La sesión ha finalizado con éxito'
        })
      }
    })
  } else {
    res.json({
      status: false,
      error: 'No existe una sesión activa'
    })
  }
};

/**
 * Método que elimina la sesíón de un cliente
 */
sesionController.limpiarSesion = async(req, res, next) => {
  if(req.session.token){
    req.session.destroy( function(error){
      if(error){
        res.json({
          status: false,
          error: 'Ocurrió un error'
        })
      } else {
        res.json({
          status: true,
          msg: 'Sesión terminada'
        });
      }
    });
  } else {
    res.json({
      status: false,
      error: 'No se pudo terminar la sesión'
    });
  }
};

sesionController.getNotificaciones = async(req, res) => {
  var hoy = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  Conversacion.find({concluido: false, participantes: []})
    .where('createdAt').gte(hoy)
    .exec( function(err, conversaciones) {
      if(err){
        res.json({
          status: false,
          error: err
        });
      } else {
        res.json({
          status: true,
          msg: 'El número de conversaciones se obtuvieron con éxito',
          data: conversaciones.length
        })
      }
    });
}

module.exports = sesionController;
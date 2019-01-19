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
      msg: 'La sesión ya está inicializada'
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

module.exports = sesionController;
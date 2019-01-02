const sesionController = {};


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
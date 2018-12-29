const sesionController = {};

sesionController.crearSesion = async(req, res, next) => {
  //console.log(req.body);
  //console.log(req.sessionStore);
  console.log(req.sessionID);
  req.session.id = req.sessionID;
  //console.log(req.session);
  //console.log(req.route);
  res.json({
    mensaje: 'Hola Mundo'
  });
}

module.exports = sesionController;
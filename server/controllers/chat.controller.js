const Conversacion = require('../models/conversacion'),
  Mensaje = require('../models/mensaje');

/**
 * Método para administrador que obtiene los mensajes de una conversación de chat
 */
exports.getMensajes = async(req, res, next) =>{
  Mensaje.find({conversacionId: req.params.id}, function(err, mensajes){
    if(err){
      res.json({
        status: false,
        error: err
      });
    } else {
      res.json({
        status: true,
        msg: 'Mensajes obtnidos',
        data: mensajes
      })
    }
  });
};

/**
 * Método para administrador que obtiene todas las conversaciones
 */
exports.getConversaciones = async (req, res, next) => {
  Conversacion.find(function(err, conversaciones){
    if(err){
      res.json({
        status: false,
        error: err
      });
    } else {
      res.json({
        status: true,
        msg: 'Conversaciones obtenidas',
        data: conversaciones,
        idUsuario : req.session.idEmpleado,
        usuario : req.session.usuario,
        tipoUsuario: req.session.tipoUsuario
      });
    }
  }).sort('-createdAt');
};

exports.getConversacionesEntre = async(req, res) =>{
  var hoy = new Date(req.params.anio, req.params.mes, req.params.dia);
  var siguiente = new Date(hoy.getTime() + 24*60*60*1000);
  //console.log(hoy);
  //console.log(siguiente);
  Conversacion.find()
    .where('createdAt').gte(hoy).lte(siguiente)
    .exec( function(err, conversaciones) {
      if(err){
        res.json({
          status: false,
          error: err
        });
      } else {
        res.json({
          status: true,
          msg: 'Las conversaciones se obtuvieron con éxito',
          data: conversaciones,
          idUsuario : req.session.idEmpleado,
          usuario: req.session.usuario,
          tipoUsuario : req.session.tipoUsuario
        })
      }
    });
  /*Conversacion.find( {'createdAt' : {'$lte': req.params.fechaFin, '$gte': req.params.fechaInicio} } ,function(err, conversaciones) {
    
  });*/
}

/**
 * Método en el que el cliente inicia una nueva conversación
 */
exports.nuevaConversacion = async (req, res, next) => {
  const conversacion = new Conversacion({
    nombreCliente : req.body.nombreCliente,
    email         : req.body.email,
    tipoConsulta  : req.body.tipoConsulta,
    consulta      : req.body.consulta
  });
  await conversacion.save(function(err, conv){
    if(err){
      res.json({
        status: false,
        error: err
      });
    } else {
      res.json({
        status: true,
        msg: 'La conversación se ha creado con éxito',
        data: conv
      });
    }
  });
};

/**
 * Método que envia una respuesta a el otro cliente
 */
exports.enviarRespuesta = async (req, res, next) => {
  const respuesta = new Mensaje({
    conversacionId : req.params.conversacionId,
    cuerpo: req.body.cuerpo,
    autor: req.body.autor,
    destino: req.body.destino
  });
  await respuesta.save(function(err, sentReply){
    if (err) {
      res.json({
        status: false,
        error: err
      });
    }else {
      res.json({
        status: true,
        msg: 'Respuesta enviada',
        data: sentReply
      });
    }
  });
};

/**
 * Método que permite al administrador unirse a un chat de un cliente seleccionado
 */
exports.unirChat = async(req, res, next) => {
  await Conversacion.findOneAndUpdate(
    {_id : req.params.id}, 
    {$push: {participantes: req.session.idEmpleado}},
    {new: false}, function(err){
      if(err){
        res.json({
          status: false,
          error: err
        });
      } else {
        res.json({
          status: true,
          msg: 'Se unió al chat con éxito'
        });
      }
    })
};
const Tienda = require('../models/tienda');
const TiendaController = {};

TiendaController.putTienda = async (req, res, next) => {
  const tienda = {
    nombre    : req.body.nombre,
    latitud   : req.body.latitud,
    longitud  : req.body.longitud
  };
  await Tienda.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set : tienda
  }, {
    new: false
  }, function(err, tienda){
    if(err){
      res.json({
        status: false,
        error: 'Se produjo el siguiente error al modificar la tienda: ' + err
      });
    } else {
      res.json({
        status: true,
        msg: 'La tienda ha sido actualizada con éxito',
        data: tienda
      });
    }
  });
};

TiendaController.createTienda = async (req, res, next) => {
  const tienda = new Tienda({
    nombre    : req.body.nombre,
    latitud   : req.body.latitud,
    longitud  : req.body.longitud 
  });
  await tienda.save(function(err, tienda){
    if(err){
      res.json({
        status: false,
        error: 'Se produjo el siguiente error al crear la tienda: ' + err,
      });
    } else {
      res.json({
        status: true,
        msg: 'La tienda ha sido agregada con éxito',
        data: tienda
      });
    }
  });
};

TiendaController.deleteTienda = async (req, res, next) => {
  await Tienda.remove({_id:req.params.id}, function(err){
    if(err){
      res.json({
        status: false,
        error: 'Se produjo el siguiente error al eliminar la tienda' + err
      });
    } else {
      res.json({
        status: true,
        msg: 'La tienda ha sido eliminada con éxito'
      })
    }
  })
};

TiendaController.getTiendas = async (req, res, next) => {
  await Tienda.find(function(err, tiendas){
    if(err){
      res.json({
        status: false,
        error : 'Se produjo el siguiente error: ' + err
      });
    } else {
      res.json({
        status: true,
        data: tiendas
      })
    }
  })
};

module.exports = TiendaController;
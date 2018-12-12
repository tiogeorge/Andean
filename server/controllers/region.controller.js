const Region = require('../models/region');
const RegionController = {};

RegionController.putRegion = async (req, res, next) => {
  const region = {
    departamento: req.body.departamento,
    provincias: req.body.provincias
  }
  await Region.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: region
  }, {
    new: false
  }, function(err){
    if(err){
      res.json({
        status: false,
        error: 'Error al actualizar los datos de la región: ' + err
      });
    } else {
      res.json({
        status: true,
        msg: "La información se actualizó con éxito."
      });
    }
  });
};

RegionController.createRegion = async (req, res, next) => {
  const region = new Region({
    departamento : req.body.departamento,
    provincias : req.body.provincias
  });
  await region.save(function(err, region){
    if(err){
      res.json({
        status: false,
        error: 'Error al insertar la región: ' + err
      });
    } else {
      res.json({
        status: true,
        msg: 'La región ha sido ingresada con éxito',
        data: region
      })
    }
  });
};

RegionController.deleteRegion = async (req, res, next) => {
  await Region.remove({_id:req.params.id}, function(err){
    if(err){
      res.json({
        status: false,
        error: 'Error al eliminar el usuario: ' + err
      });
    } else {
      res.json({
        status: true,
        msg: 'La región ha sido eliminada con éxito'
      });
    }
  });
};

RegionController.getRegiones = async (req, res, next) => {
  const regiones = await Region.find().sort('departamento');
  res.json(regiones);
};

module.exports = RegionController;
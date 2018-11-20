const Region = require('../models/region');
const RegionController = {};

RegionController.putRegion = async (req, res, next) => {
  try {
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
    });
    res.json({
      status: true,
      msg: "Dirección actualizada."
    });

  } catch (err) {
    res.json({
      status: false,
      error: "Error al modificar la dirección: " + err

    });
  }
};

RegionController.createRegion = async (req, res, next) => {
  try {
    const region = new Region(
      {
        departamento : req.body.departamento,
        provincias : req.body.provincias
      }
    );
    await region.save();
    res.json({
      status : true,
      msg: 'Región ingresada con éxito.'
    })
  }catch (e){
    res.json({
      status : false,
      error : 'Error al insertar una región: ' + e
    })
  }

};

RegionController.deleteRegion = async (req, res, next) => {
  
};

RegionController.getRegiones = async (req, res, next) => {
  const regiones = await Region.find().sort('departamento');
  res.json(regiones);
};

module.exports = RegionController;
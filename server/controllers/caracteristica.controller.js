const Caracteristica = require('../models/caracteristica');
const caracteristicaController = {};

caracteristicaController.createCaracteristica = async(req, res, next) => {
  try {
    const caracteristica = new Caracteristica({
      nombre: req.body.nombre,
      medida: req.body.medida
    });
    await caracteristica.save();
    res.json({
      status: true,
      msg: "Característica creada con éxito."
    })
  }catch(e){
    res.json({
      status: false,
      error: "Error al crear esta característica: " + e
    })
  }
}

caracteristicaController.getCaracteristica = async(req,res)=>{
  const caracteristica = await Categoria.find({
      id:req.params.id
  });
  res.json(caracteristica);

}

caracteristicaController.putCaracteristica = async(req, res, next) => {
  try{
    const caracteristica = {
      nombre : req.body.nombre,
      medida : req.body.medida
    }
    await Caracteristica.findOneAndUpdate({
      _id: req.params.id
    },{
      $set: caracteristica
    },{
      new: false
    });
    res.json({
      status: true,
      msg: "La características ha sido actualizada"
    })
  } catch (e) {
    res.json({
      status: false,
      error: "Error al actualizar la característica: " +  e
    })
  }
}

caracteristicaController.deleteCaracteristica = async(req, res, next) => {
  try {
    await Caracteristica.remove({_id: req.params.id});
    res.json({
      status: true,
      msg: "La característica ha sido eliminada."
    })
  } catch (e){
    res.json({
      status: false,
      error: "Se produjo un error al eliminar la característica: " + e
    })
  }
}

caracteristicaController.getCaracteristicas = async(req, res, next) => {
  const caracteristicas = await Caracteristica.find();
  res.json(caracteristicas);
}

module.exports = caracteristicaController;
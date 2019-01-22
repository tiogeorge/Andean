const Caracteristica = require('../models/caracteristica');
const caracteristicaController = {};

/**
 * Método que crea una nueva característica y la almacena en la BD
 */
caracteristicaController.createCaracteristica = async(req, res) => {
  const caracteristica = new Caracteristica({
    nombre: req.body.nombre,
    medida: req.body.medida
  });
  caracteristica.save(function(err){
    if(err){
      res.status(500).json({
        status: false,
        error: "Error al crear esta característica: " + err
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "Característica creada con éxito."
      });
    }
  })
}

/**
 * Método que elimina una característica
 */
caracteristicaController.deleteCaracteristica = async(req, res) => {
  Caracteristica.remove({_id: req.params.id}, function(err){
    if(err){
      res.status(500).json({
        status: false,
        error: "Se produjo un error al eliminar la característica: " + err
      })
    } else {
      res.status(200).json({
        status: true,
        msg: "La característica ha sido eliminada."
      })
    }
  })
}

/**
 * Método que obtiene una característica
 * id: es el identificador de la característica
 */
caracteristicaController.getCaracteristica = async(req,res)=>{
  Categoria.find({
      id:req.params.id
  }, function(err, caracteristica){
    if(err){
      res.status(500).json(null);
    }else {
      res.status(200).json(caracteristica);
    } 
  });
}

/**
 * Métod que obtiene todas las característica de la base de datos
 */
caracteristicaController.getCaracteristicas = async(req, res) => {
  Caracteristica.find(function(err, caracteristicas){
    if(err) res.status(500).json(null);
    else res.status(200).json(caracteristicas);
  });
}

/**
 * Método que actualiza una característica
 */
caracteristicaController.putCaracteristica = async(req, res) => {
  const caracteristica = {
    nombre : req.body.nombre,
    medida : req.body.medida
  }
  Caracteristica.findOneAndUpdate({
    _id: req.params.id
  },{
    $set: caracteristica
  },{
    new: false
  }, function(err, car){
    if(err){
      res.status(500).json({
        status: false,
        error: "Error al actualizar la característica: " +  err
      })
    } else {
      res.status(200).json({
        status: true,
        msg: "La características ha sido actualizada"
      });
    }
  });   
}

module.exports = caracteristicaController;
const Direccion = require('../models/direccion');
const direccionController = {};

/**
 * Método que actualiza una direccion de un usuario
 */
direccionController.putDireccion = async (req, res, next) => {
  try {
    const direccion = {
      direccion: req.body.direccion.toUpperCase(),
      referencia: req.body.referencia.toUpperCase(),
      departamento: req.body.departamento,
      provincia: req.body.provincia,
      distrito: req.body.distrito,
      telefono:req.body.telefono,
      tipolocal:req.body.tipolocal
    }
    await Direccion.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: direccion
    }, {
      new: false
    }, function(err, direccion){
      if(err){
        res.json({
          status: false,
          error: 'Error al actualizar la dirección: ' + err
        });
      } else {
        res.json({
          status: true,
          msg: 'Dirección actualizada con éxito'
        })
      }
    });
  } catch (err) {
    res.json({
      status: false,
      error: "Error al modificar la dirección: " + err
    });
  }
};

/**
 * Método que crea una nueva dirección para el usuario
 */
direccionController.createDireccion = async (req, res, next) => {
  try {
    const direccion = new Direccion(
      {
        usuario : req.body.usuario,
        departamento : req.body.departamento,
        provincia : req.body.provincia,
        distrito : req.body.distrito,
        direccion : req.body.direccion.toUpperCase(),
        tipolocal:req.body.tipolocal,
        referencia : req.body.referencia.toUpperCase(),
        telefono:req.body.telefono
      }
    );
    await direccion.save( function(err, direccion) {
      if(err){
        res.json({
          status: false,
          error: 'Error al insertar la dirección' + err
        });
      } else {
        res.json({
          status: true,
          msg: 'La dirección ha sido añadida con éxito',
          data: direccion
        })
      }
    });
  }catch(e)
  {
    res.json({
      status: false,
      error: "Error al insertar dirección: " + e
    })
  }
};

/**
 * Método que permite eliminar una dirección
 */
direccionController.deleteDireccion = async (req, res, next) => {
  try {
    await Direccion.remove({_id: req.params.id});
    res.json({
      status: true,
      msg: "La dirección ha sido eliminada."
    })
  } catch (err) {
    res.json({
      status: false,
      error: "Se produjo el siguiente error al eliminar: " + err

    });
  }
};

/**
 * Método que obtiene todas las direcciones de un cliente
 */
direccionController.getDirecciones = async (req, res, next) => {
  const direcciones = await Direccion.find({usuario: req.params.id});
  res.json(direcciones);
};

/**
 * Método que obtiene una dirección
 */
direccionController.getDireccion = async (req, res) => {
  const direccion = await Direccion.findById(req.params.id);
  res.json(direccion);
};


module.exports = direccionController;
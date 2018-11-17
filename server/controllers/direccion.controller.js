const Direccion = require('../models/direccion');
const direccionController = {};

direccionController.putDireccion = async (req, res, next) => {
  try {
    const direccion = {
      direccion: req.body.direccion.toUpperCase(),
      manzana: req.body.manzana.toUpperCase(),
      nroLote: req.body.nroLote,
      depInterior: req.body.depInterior,
      urbanizacion: req.body.urbanizacion.toUpperCase(),
      referencia: req.body.referencia.toUpperCase(),
      departamento: req.body.departamento,
      provincia: req.body.provincia,
      distrito: req.body.distrito
    }
    await Direccion.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: direccion
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

direccionController.createDireccion = async (req, res, next) => {
  try {
    const direccion = new Direccion(
      {
        usuario : req.body.usuario,
        direccion : req.body.direccion.toUpperCase(),
        manzana : req.body.manzana.toUpperCase(),
        nroLote : req.body.nroLote,
        depInterior : req.body.depInterior,
        urbanizacion :  req.body.urbanizacion.toUpperCase(),
        referencia : req.body.referencia.toUpperCase(),
        departamento : req.body.departamento,
        provincia : req.body.provincia,
        distrito : req.body.distrito,
      }
    );
    await direccion.save();
    res.json({
      status : true,
      msg: "Dirección añadida por éxito."
    });
  }catch(e)
  {
    res.json({
      status: false,
      error: "Error al insertar dirección: " + e
    })
  }
};

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
      mensaje: "Se produjo el siguiente error al eliminar: " + err

    });
  }
};

direccionController.getDirecciones = async (req, res, next) => {
  const direcciones = await Direccion.find({usuario: req.params.id});
  res.json(direcciones);
};

direccionController.getDireccion = async (req, res, next) => {
  const direccion = await Direccion.find({
    id: req.params.id
  });
  res.json(direccion);
};

module.exports = direccionController;
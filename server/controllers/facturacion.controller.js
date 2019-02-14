const facturacionController = {};

facturacionController.getApi = async (req, res) => {
  req.getConnection(function (error, conn) {
    var consulta = "SELECT direccion FROM tadireccionesapi WHERE tipo=('A')";
    conn.query(consulta, function (err, results) {
      if (err) {
        res.json({
          mensaje: 'Error'
        });
      } else {
        res.json({
          mensaje: results[0].direccion
        });
      }
    })
  });
};

facturacionController.getNombreCliente = async (req, res) => {
  req.getConnection(function (error, conn) {
    var consulta = "SELECT H_fnMan_NombresCliente(?) AS Mensaje";
    conn.query(consulta, [req.params.idCliente] ,function (err, results) {
      if (err) {
        res.json({
          mensaje: 'Error'
        });
      } else {
        res.json({
          mensaje: results[0].Mensaje
        });
      }
    })
  });
};

facturacionController.getDocumento = async (req, res) => {
  req.getConnection(function (err, conn) {
    // Obtener los datos de venta del comprobante
    var consulta = "call spu_anuven_datosventaarticulos(?,?,?,?)";
    var valores = [req.params.idLocal, req.params.tipoDoc, req.params.serieDoc, req.params.numeroDoc];
    conn.query(consulta, valores, function (err, results) {
      if (err) {
        res.json({
          mensaje: 'error'
        })
      } else {
        res.json(results[0][0]);
      }
    });
  });
}

facturacionController.getDetalleDocumento = async (req, res) => {
  req.getConnection(function (err, conn) {
    // Obtener el detalle de venta del comprobante
    var consultaDetalle = "CALL PA_DetalleVentaWeb(?,?,?)";
    var valoresCliente = [req.params.tipoDoc, req.params.serieDoc, req.params.numeroDoc];
    conn.query(consultaDetalle, valoresCliente, function(err, detalle){
      if(err) {
        res.json({
          mensaje: 'Error'
        })
      } else {
        res.json(detalle[0]);
      }
    });
  });
}


module.exports = facturacionController;

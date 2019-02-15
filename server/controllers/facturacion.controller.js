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

facturacionController.xmlqr = async(req, res) => {
  console.log(req.body);
  var idDoc = req.body[0].Value;
  var xml = req.body[1].Value;
  var qr = req.body[2].Value;
  var codigoHash = req.body[3].Value;
  var fechaEnvio = req.body[4].Value;
  var estado = req.body[5].Value;
  req.getConnection(function(err, conn){
    var consulta = "INSERT INTO tadocumentosxml VALUES(?,null,null,?,?,?) ON DUPLICATE KEY UPDATE estadoenvio = '"+estado+"'";
    conn.query(consulta, [idDoc, codigoHash, fechaEnvio, estado], function(err, results){
      if(err){
        res.json({
          mensaje: 'Error al guardar el XML y QR'
        });
      } else {
        res.json({
          mensaje: 'El comprobante fue registrado con éxito'
        })
      }
    })
  });
}


module.exports = facturacionController;

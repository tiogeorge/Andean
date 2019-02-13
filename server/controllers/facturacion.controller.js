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

module.exports = facturacionController;

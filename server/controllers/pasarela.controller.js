const fetch = require("node-fetch");
const pasarelaController = {};

pasarelaController.crearPago = async (req, res) => {
  const body = {
    'amount': req.body.precio,
    'currency_code': 'PEN',
    'email': req.body.email,
    'source_id': req.body.token
  };
  // Método para crear el cargo con la pasarela Culqi
  fetch('https://api.culqi.com/v2/charges', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer << llave privada >>'
      }
    })
    .then(res => res.json())
    .then(json => {
      if(json.object == 'charge'){
        res.json({
          status: true,
          msg: json.outcome.user_message,
        });
      } else if (json.object == 'error'){
        res.json({
          status: false,
          error: json.user_message,
        })
      } else {
        res.json({
          status: false,
          error: 'Error desconocido de la pasarela de pago.'
        });
      }
    })
    .catch(err => {
      res.json({
        status: false,
        error: 'Error al procesar la venta, contáctese con un administrador de Smarket.',
      });
    });
}

module.exports = pasarelaController;
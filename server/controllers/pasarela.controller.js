const fetch = require("node-fetch");
const pasarelaController = {};

pasarelaController.crearPago = async (req, res) => {
  const body = {
    'amount': req.body.precio,
    'currency_code': 'PEN',
    'email': req.body.email,
    'source_id': req.body.token
  };

  fetch('https://api.culqi.com/v2/charges',{
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer << llave privada >>'
    }
  })
  .then(res => res.json())
  .then( json => res.json({
    status: true,
    msg: json.outcome.user_message,
    data: json
  }))
  .catch( err => res.json({
    status: false,
    error: json.user_message,
    data: json
  }));
}

module.exports = pasarelaController;
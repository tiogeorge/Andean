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

pasarelaController.devolverCargo = async(req, res) => {
  const body = {
    'amount': req.body.amount,
    'charge_id': req.body.charge_id,
    'reason': req.body.reason
  };
  // Método para crear el cargo con la pasarela Culqi
  fetch('https://api.culqi.com/v2/refunds', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer << llave privada >>'
      }
    })
    .then(res => res.json())
    .then(json => {
      if(json.object == 'refund'){
        res.json({
          status: true,
          msg: 'Devolución realizada con éxito',
        });
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
        error: 'Error al procesar un reembolso.',
      });
    });
}
pasarelaController.obtenerCargo = async(req, res) => {
  // Método para crear el cargo con la pasarela Culqi
  fetch('https://api.culqi.com/v2/charges/'+ req.params.id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer <<llave privada>>'
      }
    })
    .then(res => res.json())
    .then(json => {
      if(json.object == 'charge'){
        res.json({
          status: true,
          msg: 'Se obtuvo el cargo con éxito',
          data: json
        });
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
        error: 'Error al procesar el detalle del cargo.',
        data: err
      });
    });
}

pasarelaController.listarCargos = async(req, res) => {
  // Método para crear el cargo con la pasarela Culqi
  fetch('https://api.culqi.com/v2/charges', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer <<llave privada>>'
      }
    })
    .then(res => res.json())
    .then(json => {
      if(json.data){
        res.json({
          status: true,
          msg: 'Se obtuvieron los cargos con éxito',
          data: json.data
        });
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
        error: 'Error al procesar la lista de cargos.',
        data: err
      });
    });
}

pasarelaController.listarDevoluciones = async(req, res) => {
  // Método para crear el cargo con la pasarela Culqi
  fetch('https://api.culqi.com/v2/refunds', {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer << llave privada >>'
      }
    })
    .then(res => res.json())
    .then(json => {
      if(json.data){
        res.json({
          status: true,
          msg: 'Se obtuvieron las devoluciones con éxito',
          data: json.data
        });
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
        error: 'Error al procesar la lista de devoluciones.',
      });
    });
}

module.exports = pasarelaController;
const pasarelaController = {};

pasarelaController.crearPago = async (req, res) => {
  console.warn('==============================================================');
  console.log(req.body);
  console.warn('==============================================================');
  const settings = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer << llave privada >>'
    },
    body: {
      'amount': req.body.precio,
      'currency_code': 'PEN',
      'email': req.body.email,
      'source_id': req.body.token
    }
  }
  try {
    const response = await fetch('https://api.culqi.com/v2/charges', settings);
    let data = await response.json();
    console.warn('==============================================================');
    console.log(data);
    console.warn('==============================================================');
    res.json({
      status: true,
      msg: data
    });
  } catch (err) {
    console.warn('==============================================================');
    console.log(err);
    console.warn('==============================================================');
    res.json({
      status: false,
      error: err
    })
  }

}

module.exports = pasarelaController;
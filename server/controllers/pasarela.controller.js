const pasarelaController = {};

pasarelaController.crearPago = async(req, res) => {
    console.log(req.body);
    const settings = {
       method: 'POST',
       headers:{
          'Content-type': 'application/json',
          'Authorization': 'Bearer << llave privada >>'
       },
       body : {
          'amount' : '10000',
          'currency_code': 'PEN',
          'email' : 'gabriel@gmail.com',
          'source_id': req.body.token
       }
    }
    const response = await fetch(' https://api.culqi.com/v2/charges', settings);
    let data = await response.json();
    res.json({
       msg: data
    });
}

module.exports = pasarelaController;
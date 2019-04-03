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
          'amount' : req.body.precio,
          'currency_code': 'PEN',
          'email' : req.body.email,
          'source_id': req.body.token
       }
    }
    try {
      const response = await fetch('https://api.culqi.com/v2/charges', settings);
      let data = await response.json();
      res.json({
         msg: data
      });
    }catch(e){
       res.json({
          status: false,
          error: e
       })
    }
    
}

module.exports = pasarelaController;
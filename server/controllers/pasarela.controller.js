const pasarelaController = {};

pasarelaController.crearCargo = async (req, res) => {
    cargo = {
        "amount" : 100,
        "capture" : true,
        "currency_code": "PEN",
        "description" : req.body.descripcion,
        "email": req.body.email,
        "installments" : 0,
        "metadata" : {"dni" : "00112233"},
        "source_id": req.body.tokenId,
        "antifraud_details" : {
            "address" : "Avenida Lima 213",
            "address_city" : "Lima",
            "country_code" : "PE",
            "first_name" : "Richard",
            "last_name" : "Hendricks",
            "phone_number" : 984567898
        }
    }
    // https://api.culqi.com/v2/charges
    const response = await fetch('https://api.culqi.com/v2/charges', {
        method: 'POST',
        body: cargo,
        header: {
            'Content-type' : 'application/json',
            'Authorization' : 'Bearer << sk_test_6AnORiEtNNqRhc61 >>'
        }
    })
    const myJson = await response.json();
    console.log(myJson);
    res.json(myJson);
}

module.exports = pasarelaController;
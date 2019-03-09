const pasarelaController = {};

pasarelaController.crearPago = async(req, res) => {
    console.log(req.body);
    const dateExp = req.body.tarjeta.yearExp + '/' + req.body.tarjeta.mesExp;
    pago = {
        "language": "es",
        "command": "SUBMIT_TRANSACTION",
        "merchant": {
           "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
           "apiLogin": "pRRXKOl8ikMmt9u"
        },
        "transaction": {
           "order": {
              "accountId": "512323",
              "referenceCode": "payment_test_00000001", //codigo que usa nuestro sitio
              "description": "payment test", // descripcion de la compra
              "language": "es",
              "signature": "cfddea273ca17d7e2ce3eed8e939f5a2",
              "additionalValues": {
                 "TX_VALUE": {
                    "value": 100,
                    "currency": "PEN"
                 }
              },
              "buyer": {
                 "fullName": "First name and second buyer  name",
                 "emailAddress": "buyer_test@test.com",
                 "contactPhone": "7563126",
                 "dniNumber": "5415668464654",
                 "shippingAddress": {
                    "street1": "Avenida de la poesia",
                    "street2": "106",
                    "city": "Cuzco",
                    "country": "PE",
                    "phone": "7563126"
                 }
              }
           },
           "payer": {
              "fullName": "First name and second payer name",
              "emailAddress": "payer_test@test.com",
              "contactPhone": "7563126",
              "dniNumber": "5415668464654",
              "billingAddress": {
                 "street1": "av abancay",
                 "street2": "cra 4",
                 "city": "Iquitos",
                 "country": "PE",
                 "phone": "7563126"
              }
           },
           "creditCard": {
              "number": req.body.tarjeta.number,
              "securityCode": req.body.tarjeta.securityCode,
              "expirationDate": dateExp,
              "name": "REJECTED"
           },
           "debitCard": {
            "number": req.body.tarjeta.number,
            "securityCode": req.body.tarjeta.securityCode,
            "expirationDate": dateExp,
            "name": "REJECTED"
           },
           "extraParameters": {
              "INSTALLMENTS_NUMBER": 1
           },
           "type": "AUTHORIZATION_AND_CAPTURE",
           "paymentMethod": "VISA",
           "paymentCountry": "PE",
           "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
           "ipAddress": "127.0.0.1",
           "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
           "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
        },
        "test": false
     }
     res.json(pago);
     Host = 'sandbox.api.payulatam.com';
     url = '/payments-api/4.0/service.cgi HTTP/1.1';
     /*const response = await fetch('url', {
         method: 'POST',
         body: pago,
         headers: {
             'Content-Type' : 'application/json; charset=utf8',
             'Accept' : 'application/json',
             'Content-Length' : 'length'
         }
     })*/
}

module.exports = pasarelaController;
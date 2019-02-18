const Pago = require('../models/pago');
const Clientecontroller = require('../controllers/usuario.controller');
const Cliente = require('../models/usuario');

const pagoController = {};

pagoController.GuardarPago = async (req, res) => {
    try {
        const pago = new Pago(req.body);
        console.log(req.body);
        if (pago) {
            await pago.save();
            res.json({
                mensaje: "ok"
            });
        }
        else {
            res.json({
                mensaje: "ERROR"
            });
        }
    } catch (e) {
        res.json({
            mensaje: "ERROR:" + e
        })
    }
}
/*funciones mysql */
pagoController.recuperarseriesequipos = async (req, res) => {

    req.getConnection(function (error, conn) {
        var consulta = "SELECT idNroSerie AS 'serie' FROM `taexistencias` WHERE idArticulo=('" + req.params.idarti + "') AND Disponibles>0";
        conn.query(consulta, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(results);
            }
        });
    });
}
pagoController.recuperarseriedoc = async (req, res) => {
    req.getConnection(function (error, conn) {
        var consulta = "SELECT fnRep_SerieLocalDocumento('586','BBV') as 'SERIE'";
        conn.query(consulta, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(results[0].SERIE);
            }
        });
    });
}

pagoController.ultimonumeroemitido = async (req, res) => {
    var numerodedoc = await Pago.countDocuments({ EstadoPago: 'Pagado' });
    res.json(numerodedoc);
}

pagoController.guardarpagomysql = async (req, res) => {
    req.getConnection(function (error, conn) {
        var consulta = "";
    });
}

pagoController.listarpedidos = async (req, res) => {
    const pedidos = await Pago.find();
    res.json(pedidos);
}

pagoController.listarpedidouni = async (req, res) => {
    // console.log(JSON.parse(JSON.stringify(req.params._id)));
    const pedidos = await Pago.find({ _id: req.params.id });
    console.log(pedidos);
    res.json(pedidos);
}
pagoController.listarpedidouniArt = async (req, res) => {
    const pedarti = await Pago.find({ _id: req.params.id }, 'Articulo');
    const jsonpedarti = JSON.parse(JSON.stringify(pedarti[0].Articulo));
    var cantart = (pedarti[0].Articulo).length;
    console.log(cantart);
    var cont_art = 0;
    req.getConnection(function (error, conn) {
        req.getConnection(function (error, conn) {
            for (var i = 0; i < cantart; i++) {
                var idarti = pedarti[0].Articulo[i].idarticulo;
                var consulta = "SELECT idNroSerie AS 'serie' FROM `taexistencias` WHERE idArticulo=('" + idarti + "') ";//AND Disponibles>0";
                conn.query(consulta, function (err, results) {
                    cont_art++;
                    if (err) {
                        console.log(err);
                       /* var arreglotem = new Array();
                        arreglotem.push('Error');*/
                    }
                    else {
                        jsonpedarti[i].series = JSON.parse(JSON.stringify(results));
                    }
                    if (cont_art == cantart) {
                        console.log("TERMIO DE CONSULTAR");
                        res.json(jsonpedarti);
                    }
                });
            }
        });
    });
}

/*cpnsoo(){}
const pedido = await Pago.find({ _id: req.params.id });
    const jsonpedidos= JSON.parse(JSON.stringify(pedido));
    const articulosped = await Pago.find({ _id: req.params.id }, 'Articulo');
    //console.log((articulosped[0].Articulo).length);
    var cantarti = (articulosped[0].Articulo).length;

    //  console.log('id:' +idarti);
    // funcion mysql
    var cont_art = 0;
    req.getConnection(function (error, conn) {
        for (var con = 0; con < cantarti; con++) {
            var idarti = articulosped[0].Articulo[con].idarticulo;
            console.log(con);
            console.log('id art para la consulta:' + idarti)
            var consulta = "SELECT idNroSerie AS 'serie' FROM `taexistencias` WHERE idArticulo=('" + idarti + "') AND Disponibles>0";
             conn.query(consulta, function (err, results) {
                 cont_art++;
                if (err) {
                     console.log(err);
                     var arreglotem=new Array();
                     arreglotem.push('Error');
                }
                else {
                    //console.log(idarti);
                     console.log(JSON.parse(JSON.stringify(results)));
                     //var arreglotem=new Array();
                     //arreglotem.push(JSON.parse(JSON.stringify(results[0].serie)))
                     jsonpedidos[0].series=JSON.parse(JSON.stringify(results));
                    //res.json(results);
                }
                if(cont_art==cantarti){
                    console.log("TERMIO DE CONSULTAR");
                    res.json(jsonpedidos);
                }
                // console.log('id2:' +idarti);
            });
            console.log("===========================");
        }
    });
    //
    //        console.log(idarti);

*/
pagoController.actualizarpedido = async (req, res) => {
    try {
        const art = {
            EstadoPago: req.body.EstadoPago,
            EstadoEnvio: req.body.EstadoEnvio,
            Documento: req.body.Documento
        }
        const pedido = await Pago.findByIdAndUpdate({ _id: req.params.id }, { $set: art }, { new: true });
        res.json({
            mensaje: "Se actualizo los datos"
        });
    } catch (err) {
        res.json({
            mensaje: " No se pudo actulizar los datos : ERROR:" + err
        });
    }
}



pagoController.eliminarpedido = async (req, res) => {
    await Pago.findByIdAndRemove(req, params.id);
    res.json({ 'status': 'Pedido eliminado' });
}

module.exports = pagoController;
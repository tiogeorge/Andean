const Pago = require('../models/pago');
const Pago2 = require('../models/PagoMysql');
const Clientecontroller = require('../controllers/usuario.controller');
const Cliente = require('../models/usuario');

const pagoController = {};

/* estructura mysql */

/* */

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
pagoController.guardarpagomysql = async (req, res) => {
    const pag2 = JSON.parse(JSON.stringify(req.body))
    req.getConnection(function (error, conn) {
        var consulta = "CALL spuVen_RegistrarComprobantePago('" + pag2[0].tipocomprobante + "','" + pag2[0].seriecomprobante + "','" + pag2[0].pNroComprobante + "','" + pag2[0].pFechaVenta + "','" + pag2[0].pFechaRegistro + "','" + pag2[0].pEsVentaAlContad + "','" + pag2[0].pIdEmpleado + "','" + pag2[0].pIdLocal + "','" + pag2[0].pIdCliente + "','" + pag2[0].pEsCancelad + "','" + pag2[0].pImprimirGui + "','" + pag2[0].pMontoPagado + "','" + pag2[0].pPrecioVentaTotal + "','" + pag2[0].pIGVTotal + "','" + pag2[0].pRedondeo + "','" + pag2[0].pIdNivelCliente + "','" + pag2[0].pIdLineaProducto + "','" + pag2[0].pUsarNivel + "','" + pag2[0].pObservacion + "','" + pag2[0].pMontoPagadoReal + "')";
        console.log(consulta);
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

pagoController.guardardetallemysql = async (req, res) => {
    const detall = JSON.parse(JSON.stringify(req.body))
    console.log(req.body);
    req.getConnection(function (error, conn) {
        var consulta = "CALL spuVen_RegistrarDetalleVenta('" + detall[0].pIdLocal + "','" + detall[0].pTipoComprobante + "','" + detall[0].pSerieComprobante + "','" + detall[0].pNroComprobante + "','" + detall[0].pIdArticulo + "','" + detall[0].pIdNroSerieArticulo + "','" + detall[0].pCantidad + "','" + detall[0].pPrecioVenta + "','" + detall[0].pDsctoCliente + "','" + detall[0].pIdDsctoEspecial + "','" + detall[0].pDsctoEspecial + "','" + detall[0].pDsctoNivel4 + "','" + detall[0].pIdTipoPlan + "')";
        console.log(consulta);
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
pagoController.corregirexistenciamysql=async (req,res)=>{
    const detall = JSON.parse(JSON.stringify(req.body))
    console.log(req.body);
    req.getConnection(function (error, conn) {
        var consulta = "spu_anuven_corregirExistencia('" + detall[0].pIdLocal + "','" + detall[0].pTipoComprobante + "','" + detall[0].pSerieComprobante + "','" + detall[0].pNroComprobante + "','" + detall[0].pIdArticulo + "','" + detall[0].pIdNroSerieArticulo + "','" + detall[0].pCantidad + "','" + detall[0].pPrecioVenta + "','" + detall[0].pDsctoCliente + "','" + detall[0].pIdDsctoEspecial + "','" + detall[0].pDsctoEspecial + "','" + detall[0].pDsctoNivel4 + "','" + detall[0].pIdTipoPlan + "')";
        console.log(consulta);
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
pagoController.anularventamysql=async (req,res)=>{
    const detall = JSON.parse(JSON.stringify(req.body))
    console.log(req.body);
    req.getConnection(function (error, conn) {
        var consulta = "spu_anuven_anular('" + detall[0].pIdLocal + "','" + detall[0].pTipoComprobante + "','" + detall[0].pSerieComprobante + "','" + detall[0].pNroComprobante + "','" + detall[0].pIdArticulo + "','" + detall[0].pIdNroSerieArticulo + "','" + detall[0].pCantidad + "','" + detall[0].pPrecioVenta + "','" + detall[0].pDsctoCliente + "','" + detall[0].pIdDsctoEspecial + "','" + detall[0].pDsctoEspecial + "','" + detall[0].pDsctoNivel4 + "','" + detall[0].pIdTipoPlan + "')";
        console.log(consulta);
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
        var consulta = "SELECT NroSerie FROM `tadocumentosventa` WHERE idLocal=('609') AND idTipoDocumento=('BBV')";
        conn.query(consulta, function (err, results) {
            if (err) {
                res.json(error);
                console.log(err);
            }
            else {
                res.json(results[0].NroSerie);
                console.log(results[0]);
            }
        });
    });
}

pagoController.ultimonumeroemitido = async (req, res) => {
    var numerodedoc = await Pago.countDocuments({ EstadoPago: 'Pagado' });
    res.json(numerodedoc);
}

pagoController.listarpedidos = async (req, res) => {
    const pedidos = await Pago.find();
    res.json(pedidos);
}

pagoController.listarpedidosUsuario = async (req, res) => {
    const pedidos = await Pago.find({ Correocliente: req.params.correo });
    console.log('entra');
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
        console.log('datos a actualizar');
        console.log(req.body);
        console.log(req.body[0].EstadoEnvio);
        const art = {
            EstadoPago: req.body[0].EstadoPago,
            EstadoEnvio: req.body[0].EstadoEnvio,
            //  Documento: req.body[0].Documento
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
pagoController.actualizarpedido2 = async (req, res) => {
    try {
        console.log('datos a actualizar');
        console.log(req.body);
        console.log(req.body.EstadoEnvio);
        const art = {
            //EstadoPago: req.body[0].EstadoPago,
            EstadoEnvio: req.body.EstadoEnvio,
            FechaEntrega:req.body.FechaEntrega,
            //  Documento: req.body[0].Documento
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

pagoController.consultarnropedido = async (req, res) => {
    console.log('entra');
    const msn = await Pago.find({ NroPedido: req.params.num });
    console.log(msn);
    res.json(msn);
}

pagoController.eliminarpedido = async (req, res) => {
    await Pago.findByIdAndRemove(req, params.id);
    res.json({ 'status': 'Pedido eliminado' });
}

module.exports = pagoController;
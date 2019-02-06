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
pagoController.recuperarseriedoc=async(req,res)=>{
    req.getConnection(function(error,conn){
        var consulta ="SELECT fnRep_SerieLocalDocumento('586','BBV') as 'SERIE'" ;
        conn.query(consulta, function (err, results){
            if(err){
                console.log(err);
            }
            else{
                res.json(results[0].SERIE);
            }
        });
    });
}

pagoController.ultimonumeroemitido=async(req,res)=>{
    var numerodedoc=await Pago.countDocuments({EstadoPago:'Pagado'});
    res.json(numerodedoc);
}

pagoController.guardarpagomysql= async(req,res)=>{
    req.getConnection(function (error,conn){
        var consulta = "";
    });
}

pagoController.listarpedidos = async (req, res) => {
    //const correoclient;
    /*const pet= await Pago.aggregate({
        $lookup:
        {
            from: "usuarios",
            localField: "idUsuario",
            foreignField: "_id",
            as: "datosclient"
        }
    })
    console.log(pet);*/
    const pedidos = await Pago.find();
    res.json(pedidos);
}

pagoController.listarpedidouni = async (req, res) => {
    const pedido = await Pago.findById(req.params.id);
    res.json(pedido);
}

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
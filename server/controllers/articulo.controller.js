const Articulo = require('../models/articulo');
const Categoria = require('../models/categoria');
const articuloController = {};
const MarcaArt = require('../models/marca');
var jsonArticulos;
const Equipo = require('../models/equipos');
const Card = require('../models/card');

articuloController.obtenerArticulosMysql = async (req, res) => {
    try {

        req.getConnection(function (error, conn) {
            var consulta = "SELECT * FROM (SELECT idArticulo, Descripcion, fnAS_StockArticulo(idArticulo) AS Cantidad FROM taarticulo WHERE idTipoProducto='1') tmp WHERE tmp.Cantidad>0";
            var consulta2 = "SELECT * FROM taarticulosglobal";
            var consulta3 = "SELECT idArticuloGlobal AS idArticulo, fnAS_NombreEquipo(idArticuloGlobal) as Descripcion, SUM(Cantidad) as Cantidad FROM (SELECT idArticulo, Descripcion,idArticuloGlobal, fnAS_StockArticulo(idArticulo) AS Cantidad FROM taarticulo WHERE idTipoProducto='1') tmp WHERE tmp.Cantidad>0 GROUP BY idArticuloGlobal";
            conn.query(consulta3, async function (err, results) {
                if (err) {
                    console.log(err);
                    res.json({
                        estado: "0",
                        mensaje: "ERROR: " + err
                    });
                } else {
                    jsonArticulos = JSON.parse(JSON.stringify(results));
                    for (var i = 0; i < jsonArticulos.length; i++) {
                        await verificarArticulosMongo(jsonArticulos[i].idArticulo, i);
                    }
                    console.log("termino verificar articulos");
                    res.json(jsonArticulos);
                    // console.log(jsonArticulos);

                }
            });
            if (error) {
                console.log(error);
                res.json(error);
            }
        });


    } catch (e) {
        console.log(e);
    }

}

verificarArticulosMongo = async (id, i) => {
    try {
        const articulomongo = await Articulo.find({
            idarticulo: id
        });


        if (articulomongo.length > 0) {
            const categoriamongo = await Categoria.findById(articulomongo[0].categoria);
            jsonArticulos[i].Categoria = categoriamongo.nombre;
            jsonArticulos[i].Estado = "1";
            console.log(jsonArticulos[i]);

        } else {
            jsonArticulos[i].Categoria = "SIN CATEGORIA";
            jsonArticulos[i].Estado = "0";
        }

    } catch (e) {
        console.log("currio un error");
    }

}
articuloController.obtenerArticulo = async (req, res) => {
    const articulo = await Articulo.find({
        idarticulo: req.params.id
    });
    res.json(articulo);

}
articuloController.obtenerArticuloURL = async (req, res) => {
    const articulo = await Articulo.find({
        url: req.params.id
    });
    res.json(articulo);
}

articuloController.crearArticulo = async (req, res) => {
    try {
        const articulo = new Articulo(req.body);
        if (articulo) {
            await articulo.save();
            res.json({
                estado: 1,
                mensaje: "Articulo se guardo con exito."
            });
        } else {
            res.json({
                estado: 0,
                mensaje: "ERROR: Complete todos los datos."
            });
        }



    } catch (e) {
        console.log(e);
        res.json({
            estado: 0,
            mensaje: "ERROR :" + e
        });

    }
}

articuloController.actualizarArticulo = async (req, res) => {
    try {
        const art = {
            idarticulo: req.body.idarticulo,
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            marca: req.body.marca,
            cantidad: req.body.cantidad,
            idprecio: req.body.idprecio,
            caracteristicas: req.body.caracteristicas,
            imagenes: req.body.imagenes,
            descripcion: req.body.descripcion,
            garantias: req.body.garantias
        }
        const articulo = await Articulo.findOneAndUpdate({ _id: req.params.id }, { $set: art }, { new: true });
        res.json({
            estado: 1,
            mensaje: "Se actualizaron los datos correctamente"
        });

    } catch (err) {
        res.json({
            estado: 0,
            mensaje: " No se pudo actulizar los datos de la categoria : ERROR:" + err

        });
    }

}


articuloController.eliminarArticulo = async (req, res) => {

}

articuloController.listararticulos = async (req, res) => {
    const articulos = await Articulo.find();
    res.json(articulos);
}

articuloController.buscararti = async (req, res) => {
    var tipoLinea = req.params.linea;
    var tipoPlan = req.params.tipoplan;
    var cuotas = req.params.cuotas;
    const articulosB = await Articulo.find({ "titulo": { $regex: '.*' + req.params.titulo + '.*', $options: 'i' } });
    var jsonarticulos = JSON.parse(JSON.stringify(articulosB));
    for (var i = 0; i < articulosB.length; i++) {
        console.log(req.params.linea + " - " + req.params.tipoplan + " - " + req.params.cuotas);
        var id=articulosB[i].idprecio;
        const precios = await Equipo.find({ nombreequipo: id });

        var planesfiltrados = new Array();
        for (var j = 0; j < precios[0].planes.length; j++) {
            if (precios[0].planes[j].tipolinea == tipoLinea && precios[0].planes[j].tipoplan == tipoPlan && precios[0].planes[j].cuotas == cuotas) {
                planesfiltrados.push(precios[0].planes[j]);
            }
        }
        
        jsonarticulos[i].precioplan=planesfiltrados[0];
        jsonarticulos[i].caracteristicas = [];
        jsonarticulos[i].descripcion="";
        jsonarticulos[i].garantias=[];
        
        
    }
    res.json(jsonarticulos);
}
articuloController.buscararti2 = async (req, res) => {
    var tipoLinea = req.params.linea;
    var tipoPlan = req.params.tipoplan;
    var cuotas = req.params.cuotas;
    const articulosB = await Articulo.find({ "marca": { $regex: '.*' + req.params.marca + '.*', $options: 'i' } });
    var jsonarticulos = JSON.parse(JSON.stringify(articulosB));
    for (var i = 0; i < articulosB.length; i++) {
        console.log(req.params.linea + " - " + req.params.tipoplan + " - " + req.params.cuotas);
        var id=articulosB[i].idprecio;
        const precios = await Equipo.find({ nombreequipo: id });

        var planesfiltrados = new Array();
        for (var j = 0; j < precios[0].planes.length; j++) {
            if (precios[0].planes[j].tipolinea == tipoLinea && precios[0].planes[j].tipoplan == tipoPlan && precios[0].planes[j].cuotas == cuotas) {
                planesfiltrados.push(precios[0].planes[j]);
            }
        }
        
        jsonarticulos[i].precioplan=planesfiltrados[0];
        jsonarticulos[i].caracteristicas = [];
        jsonarticulos[i].descripcion="";
        jsonarticulos[i].garantias=[];
    }
    res.json(jsonarticulos);
}
articuloController.buscararti3 = async (req, res) => {
    var tipoLinea = req.params.linea;
    var tipoPlan = req.params.tipoplan;
    var cuotas = req.params.cuotas;
    const articulosB = await Articulo.find({ "categoria": { $regex: '.*' + req.params.categoria + '.*', $options: 'i' } });
    var jsonarticulos = JSON.parse(JSON.stringify(articulosB));
    for (var i = 0; i < articulosB.length; i++) {
        console.log(req.params.linea + " - " + req.params.tipoplan + " - " + req.params.cuotas);
        var id=articulosB[i].idprecio;
        const precios = await Equipo.find({ nombreequipo: id });

        var planesfiltrados = new Array();
        for (var j = 0; j < precios[0].planes.length; j++) {
            if (precios[0].planes[j].tipolinea == tipoLinea && precios[0].planes[j].tipoplan == tipoPlan && precios[0].planes[j].cuotas == cuotas) {
                planesfiltrados.push(precios[0].planes[j]);
            }
        }
        if(planesfiltrados.length>0){
            jsonarticulos[i].precioplan=planesfiltrados[0];
        }
        else{
            jsonarticulos[i].precioplan="no tiene";
        }
        jsonarticulos[i].caracteristicas = [];
        jsonarticulos[i].descripcion="";
        jsonarticulos[i].garantias=[];
    }
    res.json(jsonarticulos);
}

var JSONPrecios = {
    caracterisca: {},
    marca: {}
};

articuloController.obtenerPreciosMysql = async (req, res) => {
    JSONPrecios = {};
    try {
        req.getConnection(function (error, conn) {
            var consulta = "SELECT * FROM (SELECT * FROM tapreciosventa WHERE idArticuloGlobal = fnAS_IDArticuloGlobal('" + req.params.id + "') AND YEAR(FechaVigencia)= YEAR(NOW()) ORDER BY FechaVigencia DESC) tmp GROUP BY idTipoPlan";
            console.log("CONSULTA : " + consulta);
            conn.query(consulta, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    JSONPrecios.postpago = JSON.parse(JSON.stringify(results));
                    console.log(results);
                    req.getConnection(function (error, conn) {
                        var consulta = "SELECT * FROM (SELECT * FROM tapreciosventa WHERE idArticuloGlobal = fnAS_IDArticuloGlobal('" + req.params.id + "') AND idTipoPlan='1')tmp ORDER BY FechaVigencia DESC LIMIT 1";
                        conn.query(consulta, function (err, results) {
                            if (err) {
                                console.log(err);
                            } else {
                                JSONPrecios.prepago = JSON.parse(JSON.stringify(results));
                                console.log("respuesta del sever mysql ");
                                console.log(JSONPrecios);
                                res.json(JSONPrecios);
                            }
                        });
                        if (error) {
                            console.log(error);
                        }
                    });
                    //console.log("respuesta del sever mysql ");    
                    //console.log(JSONPrecios);
                }
            });
            if (error) {
                console.log(error);
            }
        });

    } catch (e) {
        console.log(e);
    }

}

articuloController.guardarCards = async(req, res) => {
    try{
        await Card.update({},{$set: {activo: false}});
        var carteles = req.body.cards;
        for(var i = 0; i < carteles.length; i++){
            if(carteles[i]._id){
                await Card.findOneAndUpdate({_id: carteles[i]._id}, {$set : carteles[i]});
            }else{
                var cartel = new Card(carteles[i]);
                await cartel.save();
            }
        }
        res.json({
            status: true,
            msg: 'Los carteles han sigo registrados con éxito'
        })
    }catch(err){
        res.json({
            status: false,
            error: err
        })
    }
}

articuloController.obtenerCards = async(req, res) => {
    Card.find({activo: true}, function(err, cards) {
        if(err){
            res.json({
                status: false,
                error: err
            });
        } else {
            res.json({
                status: true,
                msg: 'Los datos se obtuvieron con éxito',
                data: cards
            })
        }
    })
}


module.exports = articuloController;
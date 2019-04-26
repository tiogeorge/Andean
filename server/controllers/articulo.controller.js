const Articulo = require('../models/articulo');
const Categoria = require('../models/categoria');
const Valoracion = require('../models/valoracion');
const articuloController = {};
const MarcaArt = require('../models/marca');
var jsonArticulos;
const Equipo = require('../models/equipos');
const Card = require('../models/card');
const Banner = require('../models/banner');
var jsonEquipos = new Array();

articuloController.obtenerArticulosMysql = async (req, res) => {
    try {

        req.getConnection(function (error, conn) {
            var consulta = "SELECT * FROM (SELECT idArticulo, Descripcion, fnAS_StockArticulo(idArticulo) AS Cantidad FROM taarticulo) tmp WHERE tmp.Cantidad>0";
            var consulta2 = "SELECT * FROM taarticulosglobal";
            var consulta3 = "SELECT idArticuloGlobal AS idArticulo, fnAS_NombreEquipo(idArticuloGlobal) as Descripcion, SUM(Cantidad) as Cantidad FROM (SELECT idArticulo, Descripcion,idArticuloGlobal, fnAlm_StockArticuloLocal(idArticulo,'609') AS Cantidad FROM taarticulo WHERE idTipoProducto='1') tmp WHERE tmp.Cantidad>0 GROUP BY idArticuloGlobal";
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

articuloController.ObtenerEquiposArticulo = async (req, res) => {
    console.log("ONTENIENDO EQUIPOS DE LOS ARTICULOS..");
    jsonEquipos = new Array();
    try {
        req.getConnection(function (error, conn) {
            var consulta3 = "SELECT idArticulo, Descripcion , fnAlm_StockArticuloLocal(idArticulo,'609')as Cantidad,fnSM_RecuperarPrecioEquipo(idArticulo) as PrecioCompra FROM taarticulo WHERE idArticuloGlobal = '" + req.params.idglobal + "'";
            conn.query(consulta3, async function (err, results) {
                if (err) {
                    console.log(err);
                    res.json({
                        estado: "0",
                        mensaje: "ERROR: " + err
                    });
                } else {
                    var jsoneq = JSON.parse(JSON.stringify(results));
                    for (var i = 0; i < jsoneq.length; i++) {
                        await verificarEquipoArticuloMongo(req.params.idglobal, jsoneq[i].idArticulo, jsoneq[i].Descripcion, jsoneq[i].Cantidad, jsoneq[i].PrecioCompra, req.params.opcion);
                    }
                    console.log("termino verificar equipos");
                    res.json(jsonEquipos);
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


verificarEquipoArticuloMongo = async (idGlobal, idequipo, descripcion, cantidad, preciounitario, opcion) => {
    try {
        const articulomongo = await Articulo.find({ idarticulo: idGlobal }, { equipos: { $elemMatch: { idequipo: idequipo } } });
        var precioventa = preciounitario;
        if(precioventa<100){
            precioventa = precioventa + precioventa *0.40;
        }else{
          if(precioventa <= 500){
            precioventa = precioventa + precioventa *0.35;
          }else{
            precioventa = precioventa + precioventa *0.30;
          }
        }

        precioventa = precioventa.toFixed(2);
        if (articulomongo.length > 0) {
            /*const categoriamongo = await Categoria.findById(articulomongo[0].categoria);
            jsonArticulos[i].Categoria = categoriamongo.nombre;
            jsonArticulos[i].Estado = "1";
            console.log(jsonArticulos[i]);*/
            console.log(articulomongo[0].equipos);
            console.log("=================================");
            console.log(opcion);
            if(opcion == "UPDATE"){
                jsonEquipos.push({
                    idequipo: idequipo,
                    descripcion: descripcion,
                    cantidad: cantidad,
                    color: articulomongo[0].equipos[0].color,
                    detalle: articulomongo[0].equipos[0].detalle,
                    imagen: articulomongo[0].equipos[0].imagen,
                    codigocolor: articulomongo[0].equipos[0].codigocolor,
                    preciocompra: preciounitario,
                    precioventa: precioventa
                });
            }else{
                jsonEquipos.push({
                    idequipo: idequipo,
                    descripcion: descripcion,
                    cantidad: cantidad,
                    color: articulomongo[0].equipos[0].color,
                    detalle: articulomongo[0].equipos[0].detalle,
                    imagen: articulomongo[0].equipos[0].imagen,
                    codigocolor: articulomongo[0].equipos[0].codigocolor,
                    preciocompra: preciounitario,
                    precioventa: articulomongo[0].equipos[0].precioventa
                });
            }
        } else {
            /* jsonArticulos[i].Categoria = "SIN CATEGORIA";
             jsonArticulos[i].Estado = "0";*/
            jsonEquipos.push({
                idequipo: idequipo,
                descripcion: descripcion,
                cantidad: cantidad,
                color: "",
                detalle: "",
                imagen: "",
                codigocolor: "#000000",
                preciocompra: preciounitario,
                precioventa: precioventa
            });
        }
    } catch (e) {
        console.log("currio un error");
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

        const articulo = await Articulo.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
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
    const articulosB = await Articulo.find({ "palabrasclaves": { $regex: '.*' + req.params.palabrasclaves + '.*', $options: 'i' } });
    var jsonarticulos = JSON.parse(JSON.stringify(articulosB));
    for (var i = 0; i < articulosB.length; i++) {
        console.log(req.params.linea + " - " + req.params.tipoplan + " - " + req.params.cuotas);
        //precios
        var id = articulosB[i].idprecio;
        const precios = await Equipo.find({ nombreequipo: id });

        var planesfiltrados = new Array();
        for (var j = 0; j < precios[0].planes.length; j++) {
            if (precios[0].planes[j].tipolinea == tipoLinea && precios[0].planes[j].tipoplan == tipoPlan && precios[0].planes[j].cuotas == cuotas) {
                planesfiltrados.push(precios[0].planes[j]);
            }
        }
        //fin
        //categoria padre
        var idhijo = articulosB[i].categoria;
        const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
        console.log('PADRE');
        console.log(catepadre[0].padre);
        //fin
        //puntuacion
        var idarti = articulosB[i].idarticulo;
        const valoraciones = await Valoracion.find({ idarticulo: idarti }, 'puntuacion')
        var cantidadcomen = valoraciones.length;
        var sumapuntuacion = 0;
        for (var p = 0; p < cantidadcomen; p++) {
            sumapuntuacion += valoraciones[p].puntuacion;
        }
        var promedioTotal = sumapuntuacion / cantidadcomen;
        var promredondado = Math.round(promedioTotal);
        //fin 
        jsonarticulos[i].puntuacion = promredondado;
        jsonarticulos[i].categoriapadre = catepadre[0].padre;
        jsonarticulos[i].precioplan = planesfiltrados[0];
        jsonarticulos[i].caracteristicas = [];
        jsonarticulos[i].descripcion = "";
        jsonarticulos[i].garantias = [];


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
        var id = articulosB[i].idprecio;
        const precios = await Equipo.find({ nombreequipo: id });

        var planesfiltrados = new Array();
        for (var j = 0; j < precios[0].planes.length; j++) {
            if (precios[0].planes[j].tipolinea == tipoLinea && precios[0].planes[j].tipoplan == tipoPlan && precios[0].planes[j].cuotas == cuotas) {
                planesfiltrados.push(precios[0].planes[j]);
            }
        }
        //categoria padre
        var idhijo = articulosB[i].categoria;
        const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
        console.log('PADRE');
        console.log(catepadre[0].padre);
        //fin
        //puntuacion
        var idarti = articulosB[i].idarticulo;
        const valoraciones = await Valoracion.find({ idarticulo: idarti }, 'puntuacion')
        var cantidadcomen = valoraciones.length;
        var sumapuntuacion = 0;
        for (var p = 0; p < cantidadcomen; p++) {
            sumapuntuacion += valoraciones[p].puntuacion;
        }
        var promedioTotal = sumapuntuacion / cantidadcomen;
        var promredondado = Math.round(promedioTotal);
        //fin 
        jsonarticulos[i].puntuacion = promredondado;
        jsonarticulos[i].categoriapadre = catepadre[0].padre;
        jsonarticulos[i].precioplan = planesfiltrados[0];
        jsonarticulos[i].caracteristicas = [];
        jsonarticulos[i].descripcion = "";
        jsonarticulos[i].garantias = [];
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
        var id = articulosB[i].idprecio;
        const precios = await Equipo.find({ nombreequipo: id });

        var planesfiltrados = new Array();
        for (var j = 0; j < precios[0].planes.length; j++) {
            if (precios[0].planes[j].tipolinea == tipoLinea && precios[0].planes[j].tipoplan == tipoPlan && precios[0].planes[j].cuotas == cuotas) {
                planesfiltrados.push(precios[0].planes[j]);
            }
        }
        if (planesfiltrados.length > 0) {
            jsonarticulos[i].precioplan = planesfiltrados[0];
        }
        else {
            jsonarticulos[i].precioplan = "no tiene";
        }
        //categoria padre
        var idhijo = articulosB[i].categoria;
        const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
        console.log('PADRE');
        console.log(catepadre[0].padre);
        //fin
        //puntuacion
        var idarti = articulosB[i].idarticulo;
        const valoraciones = await Valoracion.find({ idarticulo: idarti }, 'puntuacion')
        var cantidadcomen = valoraciones.length;
        var sumapuntuacion = 0;
        for (var p = 0; p < cantidadcomen; p++) {
            sumapuntuacion += valoraciones[p].puntuacion;
        }
        var promedioTotal = sumapuntuacion / cantidadcomen;
        var promredondado = Math.round(promedioTotal);
        //fin 
        jsonarticulos[i].puntuacion = promredondado;
        jsonarticulos[i].categoriapadre = catepadre[0].padre;
        jsonarticulos[i].caracteristicas = [];
        jsonarticulos[i].descripcion = "";
        jsonarticulos[i].garantias = [];
    }

    res.json(jsonarticulos);
}

/*busqueda segun categoria */
articuloController.busquedaGeneral = async (req, res) => {
    var categoriapadre = req.params.categoriapadre;
    var tipoLinea = req.params.linea;
    var tipoPlan = req.params.tipoplan;
    var cuotas = req.params.cuotas;
    const cathijos = await Categoria.find({ padre: categoriapadre }, '_id');
    console.log(cathijos);
    // const articulos=await Articulo.find().or([{categoria:cathijos[0]._id},{categoria:cathijos[1]._id}]);
    //busqueda
    var arreglofinal = new Array();
    for (var q = 0; q < cathijos.length; q++) {
        const articulosB = await Articulo.find({ "categoria": { $regex: '.*' + cathijos[q]._id + '.*', $options: 'i' } });
        var jsonarticulos = JSON.parse(JSON.stringify(articulosB));
        for (var i = 0; i < articulosB.length; i++) {
            console.log(req.params.linea + " - " + req.params.tipoplan + " - " + req.params.cuotas);
            var id = articulosB[i].idprecio;
            const precios = await Equipo.find({ nombreequipo: id });

            var planesfiltrados = new Array();
            for (var j = 0; j < precios[0].planes.length; j++) {
                if (precios[0].planes[j].tipolinea == tipoLinea && precios[0].planes[j].tipoplan == tipoPlan && precios[0].planes[j].cuotas == cuotas) {
                    planesfiltrados.push(precios[0].planes[j]);
                }
            }
            if (planesfiltrados.length > 0) {
                jsonarticulos[i].precioplan = planesfiltrados[0];
            }
            else {
                jsonarticulos[i].precioplan = "no tiene";
            }
            //categoria padre
            var idhijo = articulosB[i].categoria;
            const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
            console.log('PADRE');
            console.log(catepadre[0].padre);
            //fin
            //puntuacion
            var idarti = articulosB[i].idarticulo;
            const valoraciones = await Valoracion.find({ idarticulo: idarti }, 'puntuacion')
            var cantidadcomen = valoraciones.length;
            var sumapuntuacion = 0;
            for (var p = 0; p < cantidadcomen; p++) {
                sumapuntuacion += valoraciones[p].puntuacion;
            }
            var promedioTotal = sumapuntuacion / cantidadcomen;
            var promredondado = Math.round(promedioTotal);
            //fin 
            jsonarticulos[i].puntuacion = promredondado;
            jsonarticulos[i].categoriapadre = catepadre[0].padre;
            jsonarticulos[i].caracteristicas = [];
            jsonarticulos[i].descripcion = "";
            jsonarticulos[i].garantias = [];
            arreglofinal.push(jsonarticulos);
        }
    }
    //fin
    res.json(arreglofinal);
}
/*fin*/

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
articuloController.guardarBanners = async (req, res) => {
    try {
        await Banner.remove({});
        console.log(banners)
        var banners = req.body.banners;
        for (var i = 0; i < banners.length; i++) {
            var banner = new Banner(banners[i]);
            await banner.save();
        }
        res.json({
            status: true,
            msg: 'Los banners han sigo registrados con éxito'
        })


    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            error: err
        })
    }

}
articuloController.obtenerBanners = async (req, res) => {
    try {
        console.log("INGRESANDO A BANNERS");
        const banners = await Banner.find({}).select('imagen');
        res.json(banners)

    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            error: err
        });
    }
}
articuloController.obtenerArticulosBanner = async (req, res) => {
    try {
        const banner = await Banner.find({ _id: req.params.id });
        var tipoLinea = req.params.linea;
        var tipoPlan = req.params.tipoplan;
        var cuotas = req.params.cuotas;
        //res.json(banner[0].articulos);
        var jsonarticulos = JSON.parse(JSON.stringify(banner[0].articulos));

        for (var k = 0; k < banner[0].articulos.length; k++) {
            const precios = await Equipo.find({ nombreequipo: banner[0].articulos[k].idprecio });
            var planesfiltrados = new Array();
            for (var j = 0; j < precios[0].planes.length; j++) {
                if (precios[0].planes[j].tipolinea == tipoLinea && precios[0].planes[j].tipoplan == tipoPlan && precios[0].planes[j].cuotas == cuotas) {
                    planesfiltrados.push(precios[0].planes[j]);
                }
            }
            //categoria padre
            var idhijo = banner[0].articulos[k].categoria;
            const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
            //console.log('PADRE');
            //console.log(catepadre[0].padre);

            //Puntuacion
            const valoraciones = await Valoracion.find({ idarticulo: banner[0].articulos[k].idarticulo }, 'puntuacion');
            console.log(banner[0].articulos[k].idarticulo);
            var cantidadcomen = valoraciones.length;
            var sumapuntuacion = 0;
            for (var p = 0; p < cantidadcomen; p++) {
                sumapuntuacion += valoraciones[p].puntuacion;
            }
            var promedioTotal = sumapuntuacion / cantidadcomen;
            var promredondado = Math.round(promedioTotal);
            //fin
            jsonarticulos[k].categoriapadre = catepadre[0].padre;
            jsonarticulos[k].precioplan = planesfiltrados[0];
            jsonarticulos[k].puntuacion = promredondado;
        }

        res.json(jsonarticulos);

    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            error: err
        });
    }
}
articuloController.obtenerTodoBanners = async (req, res) => {
    try {
        const banners = await Banner.find({});
        res.json(banners);
    } catch (err) {
        res.json(err);
    }
}

articuloController.guardarCards = async (req, res) => {
    try {
        var carteles = req.body.cards;
        for (var i = 0; i < carteles.length; i++) {
            if (carteles[i]._id) {
                await Card.findOneAndUpdate({ _id: carteles[i]._id }, { $set: carteles[i] });
            } else {
                var cartel = new Card(carteles[i]);
                await cartel.save();
            }
        }
        res.json({
            status: true,
            msg: 'Los carteles han sido modificados con éxito'
        })
    } catch (err) {
        res.json({
            status: false,
            error: err
        })
    }
}

articuloController.obtenerCards = async (req, res) => {
    try {
        const articulosCard = await Card.find({ activo: true, tipo : 'ARTICULO'});
        const accesoriosCard = await Card.find({ activo: true, tipo : 'ACCESORIO'});
        res.json({
            status: true,
            msg: 'Los artículo y accesorio se han obtenido con éxito',
            data: articulosCard,
            data2: accesoriosCard
        });
    } catch (err) {
        res.json({
            status: false,
            error: err
        });
    }
}

articuloController.obtenerCarteles = async (req, res) => {
    try {
        //  Proceso para obtener los datos de los ARTÍCULOS y sus precios
        const listaArticulos = [];
        const articulosCard = await Card.find({ activo: true, tipo: 'ARTICULO'}, {idEquipo: 1, urlImagen: 1});
        for(var i=0; i < articulosCard.length; i++){
            const articulo = await Articulo.findOne({_id: articulosCard[i].idEquipo}, {titulo: 1, url: 1, idprecio: 1, descuento: 1});
            const precio = await Equipo.findOne({ nombreequipo: articulo.idprecio }, {planes: {$elemMatch: {nombreplan: 'PREPAGO ALTA'}}, 'planes.precio': 1});
            listaArticulos.push({
                idEquipo: articulosCard[i].idEquipo,
                urlImagen: articulosCard[i].urlImagen,
                titulo: articulo.titulo,
                url: articulo.url,
                descuento: articulo.descuento,
                precio: precio.planes[0].precio
            });
        }
        // Proceso para obtener los datos de los ACCESORIOS y sus precios
        const listaAccesorios = [];
        const accesoriosCard = await Card.find({ activo: true, tipo : 'ACCESORIO'}, {idEquipo: 1, urlImagen: 1});
        for(var j = 0; j < accesoriosCard.length; j++){
            const accesorio = await Articulo.findOne({_id: accesoriosCard[j].idEquipo}, {titulo: 1, url: 1, idprecio: 1, descuento: 1});
            const precio = await Equipo.findOne({ nombreequipo: accesorio.idprecio }, {planes: {$elemMatch: {nombreplan: 'PREPAGO ALTA'}}, 'planes.precio': 1});
            listaAccesorios.push({
                idEquipo: accesoriosCard[j].idEquipo,
                urlImagen: accesoriosCard[j].urlImagen,
                titulo: accesorio.titulo,
                url: accesorio.url,
                descuento: accesorio.descuento,
                precio: precio.planes[0].precio
            });
        }
        res.json({
            status: true,
            msg: 'Los carteles han sido obtnidos con éxito',
            data: listaArticulos,
            data2: listaAccesorios
        });
    } catch(err) {
        console.error(err);
        res.json({
            status: false,
            error: err
        })
    } 
}

articuloController.obtenerCardsTipo = async (req, res) => {
    var tiplinea = 'PREPAGO';
    var tipplan = 'ALTA';
    var cuota = '0';
    var plan = 'Plan';
    const card = await Card.find({ tipo: req.params.tipo, activo: true });
    var jsoncard = JSON.parse(JSON.stringify(card));
    for (var i = 0; i < card.length; i++) {
        console.log(card[i].tipo);
        var id = card[i].idPrecio;
        const precios = await Equipo.find({ nombreequipo: id });
        var planesfiltrados = new Array();
        /*for (var j = 0; j < precios[0].planes.length; j++) {
            if (card[i].tipo != plan && precios[0].planes[j].tipolinea == tiplinea && precios[0].planes[j].tipoplan == tipplan && precios[0].planes[j].cuotas == cuota) {
                planesfiltrados.push(precios[0].planes[j]);
            }
            else {
                if (card[i].tipo == plan && precios[0].planes[j].tipolinea == card[i].linea && precios[0].planes[j].tipoplan == card[i].tipoPlan && precios[0].planes[j].nombreplan == card[i].plan && precios[0].planes[j].cuotas == card[i].cuotas) {
                    planesfiltrados.push(precios[0].planes[j]);
                }
            }
        }
        if (planesfiltrados.length > 0) {
            jsoncard[i].precioplan = planesfiltrados[0];
        }*/
    }
    res.json(jsoncard);
}

articuloController.eliminarCard = async(req, res) => {
    Card.deleteOne({_id : req.params.id }, function(err){
        if(err){
            res.json({
                status: false,
                error: err
            });
        } else {
            res.json({
                status: true,
                msg: 'El artículo se ha eliminado con éxito'
            })
        }
    })

}


module.exports = articuloController;
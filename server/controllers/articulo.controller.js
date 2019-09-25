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
const resPerPage = 20;

articuloController.obtenerArticulosMysql = async (req, res) => {
    try {

        req.getConnection(function (error, conn) {
            var consulta = "SELECT * FROM (SELECT idArticulo, Descripcion, fnAS_StockArticulo(idArticulo) AS Cantidad FROM taarticulo) tmp WHERE tmp.Cantidad>0";
            var consulta2 = "SELECT * FROM taarticulosglobal";
            var consulta3 = "SELECT idArticuloGlobal AS idArticulo, fnAS_NombreEquipo(idArticuloGlobal) as Descripcion, SUM(Cantidad) as Cantidad FROM (SELECT idArticulo, Descripcion,idArticuloGlobal, fnSM_StockArticuloLocal(idArticulo) AS Cantidad FROM taarticulo) tmp GROUP BY idArticuloGlobal";
            conn.query(consulta3, async function (err, results) {
                if (err) {
                   // console.log(err);
                    res.json({
                        estado: "0",
                        mensaje: "ERROR: " + err
                    });
                } else {
                    jsonArticulos = JSON.parse(JSON.stringify(results));
                    for (var i = 0; i < jsonArticulos.length; i++) {
                        await verificarArticulosMongo(jsonArticulos[i].idArticulo, i);
                    }
                   // console.log("termino verificar articulos");
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
    //console.log("ONTENIENDO EQUIPOS DE LOS ARTICULOS..");
    jsonEquipos = new Array();
    try {
        req.getConnection(function (error, conn) {
            var consulta3 = "SELECT idArticulo, Descripcion , fnSM_StockArticuloLocal(idArticulo)as Cantidad,fnSM_RecuperarPrecioEquipo(idArticulo) as PrecioCompra,fnSM_RecuperarPrecioVenta('" + req.params.idglobal + "') AS PrecioVenta FROM taarticulo WHERE idArticuloGlobal = '" + req.params.idglobal + "'";
            conn.query(consulta3, async function (err, results) {
                if (err) {
                    //console.log(err);
                    res.json({
                        estado: "0",
                        mensaje: "ERROR: " + err
                    });
                } else {
                    var jsoneq = JSON.parse(JSON.stringify(results));
                    for (var i = 0; i < jsoneq.length; i++) {
                        await verificarEquipoArticuloMongo(req.params.idglobal, jsoneq[i].idArticulo, jsoneq[i].Descripcion, jsoneq[i].Cantidad, jsoneq[i].PrecioCompra,  jsoneq[i].PrecioVenta,req.params.opcion);
                    }
                    //console.log("termino verificar equipos");
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




verificarEquipoArticuloMongo = async (idGlobal, idequipo, descripcion, cantidad, preciounitario, newprecioventa,opcion) => {
    try {
        const articulomongo = await Articulo.find({ idarticulo: idGlobal }, { equipos: { $elemMatch: { idequipo: idequipo } } });
        /*var precioventa = preciounitario;
        if (precioventa < 100) {
            precioventa = precioventa + precioventa * 0.40;
        } else {
            if (precioventa <= 500) {
                precioventa = precioventa + precioventa * 0.35;
            } else {
                precioventa = precioventa + precioventa * 0.30;
            }
        }*/

        if (articulomongo.length > 0) {
            /*const categoriamongo = await Categoria.findById(articulomongo[0].categoria);
            jsonArticulos[i].Categoria = categoriamongo.nombre;
            jsonArticulos[i].Estado = "1";
            console.log(jsonArticulos[i]);*/
            console.log(articulomongo[0].equipos);
            console.log("=================================");
            console.log(opcion);
            if (opcion == "UPDATE") {
                jsonEquipos.push({
                    idequipo: idequipo,
                    descripcion: descripcion,
                    cantidad: cantidad,
                    color: articulomongo[0].equipos[0].color,
                    detalle: articulomongo[0].equipos[0].detalle,
                    imagen: articulomongo[0].equipos[0].imagen,
                    codigocolor: articulomongo[0].equipos[0].codigocolor,
                    preciocompra: preciounitario,
                    precioventa: newprecioventa,
                    //precioreferencial: precioventa
                });
            } else {
                jsonEquipos.push({
                    idequipo: idequipo,
                    descripcion: descripcion,
                    cantidad: cantidad,
                    color: articulomongo[0].equipos[0].color,
                    detalle: articulomongo[0].equipos[0].detalle,
                    imagen: articulomongo[0].equipos[0].imagen,
                    codigocolor: articulomongo[0].equipos[0].codigocolor,
                    preciocompra: preciounitario,
                    precioventa: newprecioventa
                    //precioreferencial: precioventa
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
                precioventa: newprecioventa
                //precioreferencial: precioventa
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
    //console.log(articulo);
    var jsonArticulo = JSON.parse(JSON.stringify(articulo));
    console.log(jsonArticulo);

    if(jsonArticulo[0].equipos){
        try {
            req.getConnection(function (error, conn) {   
              var consultaMYSQL = "SELECT fnSM_RecuperarPrecioVenta('"+jsonArticulo[0].idarticulo+"') AS precioventa,fnSM_RecuperarDescuentoGlobal('"+jsonArticulo[0].idarticulo+"') as descuento";
              conn.query(consultaMYSQL, async function (err, results) {
                if (err) {
                    res.json({
                        estado: "0",
                        mensaje: "ERROR: " + err
                    });
                } else {
                    console.log(jsonArticulo[0].equipos);
                    var precioventaarticulo = results[0].precioventa;
                    var descuentoarticulo = results[0].descuento;
                    var jsonEquipos = jsonArticulo[0].equipos;
                    var parametros = "";
                    for(var i = 0;i<jsonEquipos.length;i++){    
                        if(i< jsonEquipos.length-1){
                            parametros = parametros+"'"+jsonEquipos[i].idequipo+"',"
                        }else{
                            parametros = parametros+"'"+jsonEquipos[i].idequipo+"'"
                        }                           
                    }
                    console.log("parametros = "+parametros);

                    var consultaMYSQLequipos = "SELECT fnSM_StockArticuloLocal(idArticulo) AS cantidad FROM `taarticulo` WHERE idArticulo IN ("+parametros+") ORDER BY FIELD(idArticulo,"+parametros+")";
                    conn.query(consultaMYSQLequipos, async function (err, results) {
                        if (err) {
                            res.json({
                                estado: "0",
                                mensaje: "ERROR: " + err
                            });
                        } else {
                            console.log("termino la consulta de cantidades");
                            
                            var cantidades = results;
                            console.log(cantidades);
                            for(var j = 0;j<cantidades.length; j++){
                                jsonEquipos[j].precioventa= precioventaarticulo;
                                jsonEquipos[j].cantidad = cantidades[j].cantidad;
                            }
                            jsonArticulo[0].equipos = jsonEquipos;
                            jsonArticulo[0].descuento = descuentoarticulo;
                            console.log(jsonEquipos);
                            
                            res.json(jsonArticulo);
                        }
                    });
                }
              });
            });
            
        }catch(e){
            res.json({
                estado: "0",
                mensaje: "ERROR: " + e
            });
        }
            
    }else{
        console.log("ERROR NO EXISTE TODOS LOS DATOS");
    }
    //res.json(articulo);
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
    const articulos = await Articulo.find({},{idarticulo:1,titulo:1,url:1,categoria:1,marca:1,imagenes:1});
    res.json(articulos);
}

articuloController.buscararti = async (req, res) => {
    var page = req.params.page;
    console.log("pagina: "+page);
    const articulosB = await Articulo.find({ "palabrasclaves": { $regex: '.*' + req.params.palabrasclaves + '.*', $options: 'i' } }).skip((resPerPage * page) - resPerPage).limit(resPerPage);
    const numeroTotalArticulos = await Articulo.count({ "palabrasclaves": { $regex: '.*' + req.params.palabrasclaves + '.*', $options: 'i' } });
    
    var jsonarticulos = JSON.parse(JSON.stringify(articulosB));
    // Buscar precio del articulo en mysql
    var parametros = "";
    for(var i = 0;i<articulosB.length;i++){        
        if(i< articulosB.length-1){
            parametros = parametros+"'"+articulosB[i].idarticulo+"',"
        }else{
            parametros = parametros+"'"+articulosB[i].idarticulo+"'"
        } 
    }
    try {
        req.getConnection(function (error, conn) {   
          var consultaMYSQL = "SELECT fnSM_RecuperarPrecioVenta(idArticuloGlobal) AS precioventa, fnSM_StockArticuloGlobal(idArticuloGlobal) as cantidad, fnSM_RecuperarDescuentoGlobal(idArticuloGlobal) as descuento FROM `taarticulosglobal` WHERE idArticuloGlobal IN ("+parametros+") ORDER BY FIELD(idArticuloGlobal,"+parametros+")";
          conn.query(consultaMYSQL, async function (err, results) {
            if (err) {res.json({estado: "0",mensaje: "ERROR: " + err});
            } else {
                console.log("============================================");
                console.log(results)
                var preciosycantidades = results;

                for (var i = 0; i < articulosB.length; i++) {
                   // var id = articulosB[i].idprecio;
                    var planesfiltrados;
                    planesfiltrados = {
                        tipolinea: 'PREPAGO',
                        tipoplan: 'ALTA',
                        nombreplan: 'PREPAGO ALTA',
                        precio: preciosycantidades[i].precioventa,
                        cuotas: '0',
                        cuotainicial: '0',
                        montomes: '0',
                        cuotamensual: '0'
                    }
                    //fin
                   
                    //categoria padre
                    var idhijo = articulosB[i].categoria;
                    const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
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
                    jsonarticulos[i].precioplan = planesfiltrados;
                    jsonarticulos[i].caracteristicas = [];
                    jsonarticulos[i].descripcion = "";
                    jsonarticulos[i].garantias = [];
                    jsonarticulos[i].descuento = preciosycantidades[i].descuento;
                    jsonarticulos[i].cantidadtotal = preciosycantidades[i].cantidad;
                }

                //RETORNAR DATOS DE LA BUSQUEDA
                res.json(
                    {
                        articulos: jsonarticulos,
                        total: numeroTotalArticulos,
                        numpaginas: Math.ceil(numeroTotalArticulos / resPerPage)

                    });

            }
          });
        });        
      }catch(e){res.json({estado: "0",mensaje: "ERROR: " + e});}  

}
articuloController.buscararti2 = async (req, res) => {
    var page = req.params.page;
    const articulosB = await Articulo.find({ "marca": { $regex: '.*' + req.params.marca + '.*', $options: 'i' } }).skip((resPerPage * page) - resPerPage).limit(resPerPage);
    const numeroTotalArticulos = await Articulo.count({ "marca": { $regex: '.*' + req.params.marca + '.*', $options: 'i' } });

    var jsonarticulos = JSON.parse(JSON.stringify(articulosB));
    // Buscar precio del articulo en mysql
    var parametros = "";
    for(var i = 0;i<articulosB.length;i++){        
        if(i< articulosB.length-1){
            parametros = parametros+"'"+articulosB[i].idarticulo+"',"
        }else{
            parametros = parametros+"'"+articulosB[i].idarticulo+"'"
        } 
    }
    try {
        req.getConnection(function (error, conn) {   
          var consultaMYSQL = "SELECT fnSM_RecuperarPrecioVenta(idArticuloGlobal) AS precioventa, fnSM_StockArticuloGlobal(idArticuloGlobal) as cantidad, fnSM_RecuperarDescuentoGlobal(idArticuloGlobal) as descuento FROM `taarticulosglobal` WHERE idArticuloGlobal IN ("+parametros+") ORDER BY FIELD(idArticuloGlobal,"+parametros+")";
          conn.query(consultaMYSQL, async function (err, results) {
            if (err) {res.json({estado: "0",mensaje: "ERROR: " + err});
            } else {
                console.log("============================================");
                console.log(results)
                var preciosycantidades = results;

                for (var i = 0; i < articulosB.length; i++) {
                   // var id = articulosB[i].idprecio;
                    var planesfiltrados;
                    planesfiltrados = {
                        tipolinea: 'PREPAGO',
                        tipoplan: 'ALTA',
                        nombreplan: 'PREPAGO ALTA',
                        precio: preciosycantidades[i].precioventa,
                        cuotas: '0',
                        cuotainicial: '0',
                        montomes: '0',
                        cuotamensual: '0'
                    }
                    //fin
                   
                    //categoria padre
                    var idhijo = articulosB[i].categoria;
                    const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
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
                    jsonarticulos[i].precioplan = planesfiltrados;
                    jsonarticulos[i].caracteristicas = [];
                    jsonarticulos[i].descripcion = "";
                    jsonarticulos[i].garantias = [];
                    jsonarticulos[i].descuento = preciosycantidades[i].descuento;
                    jsonarticulos[i].cantidadtotal = preciosycantidades[i].cantidad;
                }
                //RETORNAR DATOS DE LA BUSQUEDA
                res.json(
                    {
                        articulos: jsonarticulos,
                        total: numeroTotalArticulos,
                        numpaginas: Math.ceil(numeroTotalArticulos / resPerPage)

                    });

            }
          });
        });        
      }catch(e){res.json({estado: "0",mensaje: "ERROR: " + e});}  
}
articuloController.buscararti3 = async (req, res) => {
    var page = req.params.page;
    const articulosB = await Articulo.find({ "categoria": { $regex: '.*' + req.params.categoria + '.*', $options: 'i' } }).skip((resPerPage * page) - resPerPage).limit(resPerPage);
    const numeroTotalArticulos = await Articulo.count({ "categoria": { $regex: '.*' + req.params.categoria + '.*', $options: 'i' } });

    var jsonarticulos = JSON.parse(JSON.stringify(articulosB));
    // Buscar precio del articulo en mysql
    var parametros = "";
    for(var i = 0;i<articulosB.length;i++){        
        if(i< articulosB.length-1){
            parametros = parametros+"'"+articulosB[i].idarticulo+"',"
        }else{
            parametros = parametros+"'"+articulosB[i].idarticulo+"'"
        } 
    }
    try {
        req.getConnection(function (error, conn) {   
          var consultaMYSQL = "SELECT fnSM_RecuperarPrecioVenta(idArticuloGlobal) AS precioventa, fnSM_StockArticuloGlobal(idArticuloGlobal) as cantidad, fnSM_RecuperarDescuentoGlobal(idArticuloGlobal) as descuento FROM `taarticulosglobal` WHERE idArticuloGlobal IN ("+parametros+") ORDER BY FIELD(idArticuloGlobal,"+parametros+")";
          conn.query(consultaMYSQL, async function (err, results) {
            if (err) {res.json({estado: "0",mensaje: "ERROR: " + err});
            } else {
                console.log("============================================");
                console.log(results)
                var preciosycantidades = results;

                for (var i = 0; i < articulosB.length; i++) {
                   // var id = articulosB[i].idprecio;
                    var planesfiltrados;
                    planesfiltrados = {
                        tipolinea: 'PREPAGO',
                        tipoplan: 'ALTA',
                        nombreplan: 'PREPAGO ALTA',
                        precio: preciosycantidades[i].precioventa,
                        cuotas: '0',
                        cuotainicial: '0',
                        montomes: '0',
                        cuotamensual: '0'
                    }
                    //fin
                   
                    //categoria padre
                    var idhijo = articulosB[i].categoria;
                    const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
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
                    jsonarticulos[i].precioplan = planesfiltrados;
                    jsonarticulos[i].caracteristicas = [];
                    jsonarticulos[i].descripcion = "";
                    jsonarticulos[i].garantias = [];
                    jsonarticulos[i].descuento = preciosycantidades[i].descuento;
                    jsonarticulos[i].cantidadtotal = preciosycantidades[i].cantidad;
                }
                //console.log("ARTICULOS POR CATEGORIA");
                //RETORNAR DATOS DE LA BUSQUEDA
                res.json(
                    {
                        articulos: jsonarticulos,
                        total: numeroTotalArticulos,
                        numpaginas: Math.ceil(numeroTotalArticulos / resPerPage)

                    });
                

            }
          });
        });        
      }catch(e){res.json({estado: "0",mensaje: "ERROR: " + e});}  
}

/*busqueda segun categoria */
articuloController.busquedaGeneral = async (req, res) => {
    var page = req.params.page;
    var categoriapadre = req.params.categoriapadre;
    const cathijos = await Categoria.find({ padre: categoriapadre }, '_id');
    var idcatHijos = new Array();
    for(var i = 0;i<cathijos.length;i++){
        idcatHijos.push(cathijos[i]._id);
    }
    const articulosB = await Articulo.find({ "categoria": { $in:idcatHijos} }).skip((resPerPage * page) - resPerPage).limit(resPerPage);
    const numeroTotalArticulos = await Articulo.count({ "categoria": { $in:idcatHijos} });

    var jsonarticulos = JSON.parse(JSON.stringify(articulosB));
    // Buscar precio del articulo en mysql
    var parametros = "";
    for(var i = 0;i<articulosB.length;i++){        
        if(i< articulosB.length-1){
            parametros = parametros+"'"+articulosB[i].idarticulo+"',"
        }else{
            parametros = parametros+"'"+articulosB[i].idarticulo+"'"
        } 
    }
    try {
        req.getConnection(function (error, conn) {   
          var consultaMYSQL = "SELECT fnSM_RecuperarPrecioVenta(idArticuloGlobal) AS precioventa, fnSM_StockArticuloGlobal(idArticuloGlobal) as cantidad, fnSM_RecuperarDescuentoGlobal(idArticuloGlobal) as descuento FROM `taarticulosglobal` WHERE idArticuloGlobal IN ("+parametros+") ORDER BY FIELD(idArticuloGlobal,"+parametros+")";
          conn.query(consultaMYSQL, async function (err, results) {
            if (err) {res.json({estado: "0",mensaje: "ERROR: " + err});
            } else {
                console.log("============================================");
                console.log(results)
                var preciosycantidades = results;

                for (var i = 0; i < articulosB.length; i++) {
                   // var id = articulosB[i].idprecio;
                    var planesfiltrados;
                    planesfiltrados = {
                        tipolinea: 'PREPAGO',
                        tipoplan: 'ALTA',
                        nombreplan: 'PREPAGO ALTA',
                        precio: preciosycantidades[i].precioventa,
                        cuotas: '0',
                        cuotainicial: '0',
                        montomes: '0',
                        cuotamensual: '0'
                    }
                    //fin
                   
                    //categoria padre
                    var idhijo = articulosB[i].categoria;
                    const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
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
                    jsonarticulos[i].precioplan = planesfiltrados;
                    jsonarticulos[i].caracteristicas = [];
                    jsonarticulos[i].descripcion = "";
                    jsonarticulos[i].garantias = [];
                    jsonarticulos[i].descuento = preciosycantidades[i].descuento;
                    jsonarticulos[i].cantidadtotal = preciosycantidades[i].cantidad;
                }
                //console.log("ARTICULOS POR CATEGORIA");
                //RETORNAR DATOS DE LA BUSQUEDA
                res.json(
                    {
                        articulos: jsonarticulos,
                        total: numeroTotalArticulos,
                        numpaginas: Math.ceil(numeroTotalArticulos / resPerPage)

                    });
                

            }
          });
        });        
      }catch(e){res.json({estado: "0",mensaje: "ERROR: " + e});}  
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
       // console.log("INGRESANDO A BANNERS");
        const banners = await Banner.find({}).select('imagen');
        res.json(banners)

    } catch (err) {
        //console.log(err);
        res.json({
            status: false,
            error: err
        });
    }
}
articuloController.obtenerArticulosBanner = async (req, res) => {
    try {
        var page = req.params.page;
        const banner = await Banner.find({ _id: req.params.id });

        //res.json(banner[0].articulos);
        var idArticulosBanner=new Array();
        for(var i =0;i<banner[0].articulos.length;i++){
            idArticulosBanner.push(banner[0].articulos[i].idarticulo);
        }
        console.log(banner[0].articulos);
        console.log("SE OBTUVO LOS DATOS DE ARTICULOS");
        console.log(idArticulosBanner);

        const articulosB = await Articulo.find({ idarticulo:{ $in:idArticulosBanner} }).skip((resPerPage * page) - resPerPage).limit(resPerPage);
        var jsonarticulos = JSON.parse(JSON.stringify(articulosB));
        const numeroTotalArticulos = await Articulo.count({ idarticulo:{ $in:idArticulosBanner} });
        // Buscar precio del articulo en mysql
    var parametros = "";
    for(var i = 0;i<articulosB.length;i++){        
        if(i< articulosB.length-1){
            parametros = parametros+"'"+articulosB[i].idarticulo+"',"
        }else{
            parametros = parametros+"'"+articulosB[i].idarticulo+"'"
        } 
    }
    try {
        req.getConnection(function (error, conn) {   
          var consultaMYSQL = "SELECT fnSM_RecuperarPrecioVenta(idArticuloGlobal) AS precioventa, fnSM_StockArticuloGlobal(idArticuloGlobal) as cantidad, fnSM_RecuperarDescuentoGlobal(idArticuloGlobal) as descuento FROM `taarticulosglobal` WHERE idArticuloGlobal IN ("+parametros+") ORDER BY FIELD(idArticuloGlobal,"+parametros+")";
          conn.query(consultaMYSQL, async function (err, results) {
            if (err) {res.json({estado: "0",mensaje: "ERROR: " + err});
            } else {
                console.log("============================================");
                console.log(results)
                var preciosycantidades = results;

                for (var i = 0; i < articulosB.length; i++) {
                   // var id = articulosB[i].idprecio;
                    var planesfiltrados;
                    planesfiltrados = {
                        tipolinea: 'PREPAGO',
                        tipoplan: 'ALTA',
                        nombreplan: 'PREPAGO ALTA',
                        precio: preciosycantidades[i].precioventa,
                        cuotas: '0',
                        cuotainicial: '0',
                        montomes: '0',
                        cuotamensual: '0'
                    }
                    //fin
                   
                    //categoria padre
                    var idhijo = articulosB[i].categoria;
                    const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
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
                    jsonarticulos[i].precioplan = planesfiltrados;
                    jsonarticulos[i].caracteristicas = [];
                    jsonarticulos[i].descripcion = "";
                    jsonarticulos[i].garantias = [];
                    jsonarticulos[i].descuento = preciosycantidades[i].descuento;
                    jsonarticulos[i].cantidadtotal = preciosycantidades[i].cantidad;
                }
                res.json(
                    {
                        articulos: jsonarticulos,
                        total: numeroTotalArticulos,
                        numpaginas: Math.ceil(numeroTotalArticulos / resPerPage)

                    });

            }
          });
        });        
      }catch(e){res.json({estado: "0",mensaje: "ERROR: " + e});}  

    } catch (err) {
        //console.log(err);
        res.json({estado: "0",mensaje: "ERROR: " + e});
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
        const articulosCard = await Card.find({ activo: true, tipo: 'ARTICULO' });
        const accesoriosCard = await Card.find({ activo: true, tipo: 'ACCESORIO' });
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
    
    //  Proceso para obtener los datos de los ARTÍCULOS y sus precios
    const listaArticulos = [];
    const listaAccesorios = [];
    const articulosCard = await Card.find({ activo: true, tipo: 'ARTICULO' }, { idEquipo: 1, urlImagen: 1 });
    const accesoriosCard = await Card.find({ activo: true, tipo: 'ACCESORIO' }, { idEquipo: 1, urlImagen: 1 });
    var idarticuloscard = new Array();
    var idaccesorioscard = new Array();
    for(var i = 0;i<articulosCard.length;i++){
        idarticuloscard.push(articulosCard[i].idEquipo);
    }
    for(var i = 0;i<accesoriosCard.length;i++){
        idaccesorioscard.push(accesoriosCard[i].idEquipo);
    }

    //Obtener articulos
    const articulos = await Articulo.find({ _id:{ $in:idarticuloscard} });
    const accesorios = await Articulo.find({ _id:{ $in:idaccesorioscard} });
    console.log("ARTICULOS");
    console.log(idarticuloscard);
    console.log(articulos);

    //Convertir a json
    var jsonarticulos = JSON.parse(JSON.stringify(articulos));
    var jsonaccesorios = JSON.parse(JSON.stringify(accesorios));

    // Buscar precio del articulo en mysql
    var parametros = "";
    for(var i = 0;i<articulos.length;i++){        
        if(i< articulos.length-1){
            parametros = parametros+"'"+articulos[i].idarticulo+"',"
        }else{
            parametros = parametros+"'"+articulos[i].idarticulo+"'"
        } 
    }
    try {
        console.log("OBTENIENDO PRECIOS DEL ARICULOS");
        req.getConnection(function (error, conn) {   
          var consultaMYSQL = "SELECT fnSM_RecuperarPrecioVenta(idArticuloGlobal) AS precioventa, fnSM_StockArticuloGlobal(idArticuloGlobal) as cantidad, fnSM_RecuperarDescuentoGlobal(idArticuloGlobal) as descuento FROM `taarticulosglobal` WHERE idArticuloGlobal IN ("+parametros+") ORDER BY FIELD(idArticuloGlobal,"+parametros+")";
          conn.query(consultaMYSQL, async function (err, results) {
            if (err) {  console.log(err); res.json({estado: "0",mensaje: "ERROR: " + err});
            } else {
                //console.log("============================================");
                //console.log(results)
                var preciosycantidades = results;

                for (var i = 0; i < articulos.length; i++) {
                   // var id = articulosB[i].idprecio;
                    var planesfiltrados;
                    planesfiltrados = {
                        tipolinea: 'PREPAGO',
                        tipoplan: 'ALTA',
                        nombreplan: 'PREPAGO ALTA',
                        precio: preciosycantidades[i].precioventa,
                        cuotas: '0',
                        cuotainicial: '0',
                        montomes: '0',
                        cuotamensual: '0'
                    }
                    //fin
                   
                    //categoria padre
                    var idhijo = articulos[i].categoria;
                    const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
                    //fin
                    //puntuacion
                    var idarti = articulos[i].idarticulo;
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
                    jsonarticulos[i].precioventa = preciosycantidades[i].precioventa;
                    jsonarticulos[i].caracteristicas = [];
                    jsonarticulos[i].descripcion = "";
                    jsonarticulos[i].garantias = [];
                    jsonarticulos[i].descuento = preciosycantidades[i].descuento;
                    jsonarticulos[i].cantidadtotal = preciosycantidades[i].cantidad;
                }

                //buscasr accesorios
                var parametros2 = "";
                for(var i = 0;i<accesorios.length;i++){        
                    if(i< accesorios.length-1){
                        parametros2 = parametros2+"'"+accesorios[i].idarticulo+"',"
                    }else{
                        parametros2 = parametros2+"'"+accesorios[i].idarticulo+"'"
                    } 
                }
                try {
                    console.log("OBTENIENDO PRECIOS DEL ACCESORIOS");
                    req.getConnection(function (error, conn) {   
                    var consultaMYSQL = "SELECT fnSM_RecuperarPrecioVenta(idArticuloGlobal) AS precioventa, fnSM_StockArticuloGlobal(idArticuloGlobal) as cantidad, fnSM_RecuperarDescuentoGlobal(idArticuloGlobal) as descuento FROM `taarticulosglobal` WHERE idArticuloGlobal IN ("+parametros2+") ORDER BY FIELD(idArticuloGlobal,"+parametros2+")";
                    conn.query(consultaMYSQL, async function (err, results) {
                        if (err) {
                            console.log(err);   res.json({status: true,
                                msg: 'Los carteles han sido obtnidos con éxito',
                                data: jsonarticulos,
                                data2: jsonaccesorios});
                        } else {
                            console.log("============================================");
                            console.log(results)
                            var preciosycantidades = results;

                            for (var i = 0; i < accesorios.length; i++) {
                            // var id = articulosB[i].idprecio;
                                var planesfiltrados;
                                planesfiltrados = {
                                    tipolinea: 'PREPAGO',
                                    tipoplan: 'ALTA',
                                    nombreplan: 'PREPAGO ALTA',
                                    precio: preciosycantidades[i].precioventa,
                                    cuotas: '0',
                                    cuotainicial: '0',
                                    montomes: '0',
                                    cuotamensual: '0'
                                }
                                //fin
                            
                                //categoria padre
                                var idhijo = accesorios[i].categoria;
                                const catepadre = await Categoria.find({ _id: idhijo }, 'padre');
                                //fin
                                //puntuacion
                                var idarti = accesorios[i].idarticulo;
                                const valoraciones = await Valoracion.find({ idarticulo: idarti }, 'puntuacion')
                                var cantidadcomen = valoraciones.length;
                                var sumapuntuacion = 0;
                                for (var p = 0; p < cantidadcomen; p++) {
                                    sumapuntuacion += valoraciones[p].puntuacion;
                                }
                                var promedioTotal = sumapuntuacion / cantidadcomen;
                                var promredondado = Math.round(promedioTotal);
                                //fin 
                                jsonaccesorios[i].puntuacion = promredondado;
                                jsonaccesorios[i].categoriapadre = catepadre[0].padre;
                                jsonaccesorios[i].precioventa = preciosycantidades[i].precioventa;
                                jsonaccesorios[i].caracteristicas = [];
                                jsonaccesorios[i].descripcion = "";
                                jsonaccesorios[i].garantias = [];
                                jsonaccesorios[i].descuento = preciosycantidades[i].descuento;
                                jsonaccesorios[i].cantidadtotal = preciosycantidades[i].cantidad;
                            }
                            res.json({
                                status: true,
                                msg: 'Los carteles han sido obtnidos con éxito',
                                data: jsonarticulos,
                                data2: jsonaccesorios
                            });
                        }
                    });
                    });        
                }catch(e){res.json({estado: "0",mensaje: "ERROR: " + e});} 
            }
          });
        });        
      }catch(e){res.json({estado: "0",mensaje: "ERROR: " + e});}  

}

articuloController.obtenerCardsTipo = async (req, res) => {
    var tiplinea = 'PREPAGO';
    var tipplan = 'ALTA';
    var cuota = '0';
    var plan = 'Plan';
    const card = await Card.find({ tipo: req.params.tipo, activo: true });
    var jsoncard = JSON.parse(JSON.stringify(card));
    for (var i = 0; i < card.length; i++) {
      //  console.log(card[i].tipo);
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

articuloController.eliminarCard = async (req, res) => {
    Card.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
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
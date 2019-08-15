const Equipo = require('../models/equipos');
const precioController = {};
const XLSX= require('xlsx');
const Plan = require('../models/plan');
const Precio = require('../models/precio');
const excel = require('exceljs');


precioController.getPlanesEquipo = async(req,res)=>{
  var id = req.params.id;
  var tipoLinea = req.params.linea;
  var tipoPlan = req.params.tipoplan;
  var cuotas = req.params.cuotas;
  console.log(req.params.linea+" - "+req.params.tipoplan+" - "+req.params.cuotas);
  const precios = await Equipo.find({nombreequipo: id});

  var planesfiltrados = new Array();
  for(var i=0;i<precios[0].planes.length;i++){
    if(precios[0].planes[i].tipolinea == tipoLinea && precios[0].planes[i].tipoplan== tipoPlan && precios[0].planes[i].cuotas == cuotas){
      planesfiltrados.push(precios[0].planes[i]);
    }
    
  }
  res.json(planesfiltrados);
}


precioController.getListaPrecios=async(req,res)=>{
  /*const listaprecios = await Precio.find();
  res.json(listaprecios);*/
  console.log("OBTENIENDO PRECIOS");
  var query = "SELECT `idArticuloGlobal`AS idarticuloglobal, `NombreGlobal` AS descripcion,fnSM_RecuperarPrecioGlobal(idArticuloGlobal) AS preciocomprasinigv,fnSM_RecuperarPrecioVenta(idArticuloGlobal) AS precioventa  ,fnSM_RecuperarPrecioVentaMinimo(idArticuloGlobal) AS precioventaminimo, fnSM_RecuperarDescuentoGlobal(idArticuloGlobal) AS descuento FROM `taarticulosglobal`";
  
  try {
    req.getConnection(function (error, conn) {   
      conn.query(query, async function (err, results) {
        if (err) {
            res.json({
                estado: "0",
                mensaje: "ERROR: " + err
            });
        } else {
 
          res.json(results);
        }
      });
    });
    
  }catch(e){
    res.json({
      estado: "0",
      mensaje: "ERROR: " + e
    });
  }

}
precioController.generarExcelArticulos = async(req,res)=>{
  let workbook = new excel.Workbook({useStyles: true}); //creating workbook
  var datetime = new Date().toISOString().split("T")[0];
  let worksheet = workbook.addWorksheet('Lista Articulos '+datetime, {views: [{state: 'frozen', ySplit: 1}]}); //creating worksheet
  
  //Obtener lista de articulos
  try {
      req.getConnection(function (error, conn) {          
          //var consulta = "SELECT idArticuloGlobal,NombreGlobal, fnSM_RecuperarPrecioGlobal(idArticuloGlobal) as PrecioCompra FROM taarticulosglobal ORDER BY NombreGlobal";
          var consulta2 = "SELECT * FROM( SELECT idArticuloGlobal AS idArticulo, fnAS_NombreEquipo(idArticuloGlobal) AS Descripcion, SUM(Cantidad) AS Cantidad,fnSM_RecuperarPrecioGlobal(idArticuloGlobal) AS PrecioCompra, fnSM_RecuperarPrecioVenta(idArticuloGlobal) AS PrecioVenta, fnSM_RecuperarPrecioVentaMinimo(idArticuloGlobal) AS PrecioVentaMinimo FROM (SELECT idArticulo, Descripcion,idArticuloGlobal, fnSM_StockArticuloLocal(idArticulo) AS Cantidad FROM taarticulo) tmp  WHERE Cantidad >0 GROUP BY idArticuloGlobal) tmp2 WHERE PrecioVenta=0 ORDER BY Descripcion";
          conn.query(consulta2, async function (err, results) {
              if (err) {
                  res.json({
                      estado: "0",
                      mensaje: "ERROR: " + err
                  });
              } else {
                  jsonArticulos = JSON.parse(JSON.stringify(results));
                  //  WorkSheet Header
                  worksheet.columns = [
                    { header: 'idArticulo', key: 'idArticulo', width: 20 },
                    { header: 'Descripcion', key: 'Descripcion', width: 50 },
                    { header: 'Cantidad', key: 'Cantidad', width: 10 },
                    { header: 'PrecioCompra', key: 'PrecioCompra', width: 20 },
                    { header: 'Precio Compra con IGV', key: 'PrecioCompraIGV', width: 20 },
                    { header: 'Precio Venta', key: 'PrecioVenta', width: 20 },
                    { header: 'Precio Venta Minimo', key: 'PrecioVentaMinimo', width: 20 }
                    
                  ];
                  for(var i = 0;i<jsonArticulos.length;i++){
                    //jsonArticulos[i].PrecioVenta="";
                    jsonArticulos[i].PrecioCompraIGV = jsonArticulos[i].PrecioCompra*1.18;
                    
                    if(jsonArticulos[i].PrecioVentaMinimo == 0){
                      jsonArticulos[i].PrecioVentaMinimo = jsonArticulos[i].PrecioCompraIGV*1.20;
                    }
                    if(jsonArticulos[i].PrecioVenta == 0){
                        jsonArticulos[i].PrecioVenta = jsonArticulos[i].PrecioCompraIGV*1.25;
                    }
                    
                    //jsonArticulos[i].PrecioCompra = jsonArticulos[i].PrecioCompra.toFixed(2);
                  }
                  
                  //Add row of products
                  worksheet.addRows(jsonArticulos);

                  
                  //Set style to header   
                  worksheet.getRow(1).height = 25; 
                  worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'left' };
                  worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                    row.eachCell({ includeEmpty: true },function(cell, columNumber) {
                      cell.border = {
                        left: {style:'thin',color: {argb:'30B3B3B3'}},
                        right: {style:'thin',color: {argb:'30B3B3B3'}}
                      };
                      if(rowNumber == 1){
                        cell.fill = {
                          type: 'pattern',
                          pattern:'solid',
                          fgColor:{argb:'FF171923'},
                          bgColor:{argb:'00FFFFFF'}
                        };
                      }else{
                        if(rowNumber%2 == 0){
                          cell.fill = {
                            type: 'pattern',
                            pattern:'solid',
                            fgColor:{argb:'30EFEFEF'},
                            bgColor:{argb:'00FFFFFF'}
                          };
                        }else{
                          cell.fill = {
                            type: 'pattern',
                            pattern:'solid',
                            fgColor:{argb:'00FFFFFF'},
                            bgColor:{argb:'00FFFFFF'}
                          };
                                          
                        }
                        if(columNumber == 4 || columNumber == 5 || columNumber == 6 || columNumber == 7)        {
                          cell.numFmt = '"S/. "#,##0.00;[Red]\-"S/."#,##0.00';
                        }  
                      }
                    });
                  });

                  worksheet.getCell('A1').font = {                    
                    size: 12,
                    bold: true,
                    color: { argb: 'FFFFFFFF' }
                  }; 
                  worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                    if(rowNumber>1){row.font = { size: 11, bold: false};}
                  });
                  // Write to File
                  
                  console.log("GENERANDO ARCHIVO EXCEL");
                  var filename = "Lista de Precios "+datetime+".xlsx";
                  workbook.xlsx.writeFile("./excel/"+filename)
                  .then(function() {
                    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    res.setHeader("Content-Disposition", "attachment; filename=" + filename);
                    res.sendfile("./excel/"+filename);
                  });
              }
          });
          if (error) {
              res.json(error);
          }
      });
    } catch (e) {
        console.log(e);
    }  
}

precioController.subirExcel=async(req,res)=>{
  console.log(req.file.originalname);
  const workbook = XLSX.readFile("./excel/"+req.file.originalname) ;
  const hojas = workbook.SheetNames;
  //Recorrer hojas del EXCEL
  for(var i = 0;i<hojas.length;i++){
    var hoja = hojas[i];
    var jsonHoja = XLSX.utils.sheet_to_json(workbook.Sheets[hojas[i]]);//obtener la hoja i en json
    var tipoLinea = "";
    if(hoja.toUpperCase().includes("CUOTA")){
      tipoLinea = "POSTPAGO";
      // Obetner nombre del tipo plan (PORTABILIDAD, RENOVACION,.....)
      var nombreTipoPlan="";
      var numeroCuotas = 0;
      if(hoja.toUpperCase().includes("PORTA")){nombreTipoPlan = "PORTABILIDAD";}else{nombreTipoPlan = "RENOVACION";}
      if(hoja.toUpperCase().includes("EXCLUSIVA")){nombreTipoPlan = nombreTipoPlan+" "+"EXCLUSIVA";}
      if(hoja.includes("12")){ numeroCuotas = 12;}
      if(hoja.includes("18")){ numeroCuotas = 18;}
      //console.log(nombreTipoPlan);
      var planesCuotas = new Array();
      var lineaplanes = false;
      //Obtener lista de planes
      for(var dato in jsonHoja[0]){
        if(dato.toUpperCase().includes("INICIAL")){lineaplanes = true;}
        if(dato.toUpperCase().includes("MENSUAL")){break;}
        if(lineaplanes){planesCuotas.push(jsonHoja[0][dato].split("\r\n")[0]);}        
      }
      // OBTENER CUOTAS INICIALES Y CUOTAS MENSUALES DE LOS PLANES
      for(var fila=1;fila<jsonHoja.length;fila++){
        var contdatos = 0;
        var nombreEquipo = "";
        var cuotasIniciales = new Array();
        var preciosPlanes = new Array();
        var estacuotainicial = false;
        for(var dato in jsonHoja[fila]){
          if(contdatos == 0){nombreEquipo = jsonHoja[fila][dato];}
          else{if(dato.toUpperCase().includes("INICIAL")){estacuotainicial = true;}
            if(dato.toUpperCase().includes("MENSUAL")){estacuotainicial = false;}
            if(estacuotainicial){cuotasIniciales.push(jsonHoja[fila][dato]);}
            else{preciosPlanes.push(jsonHoja[fila][dato]);}}
          contdatos++;
        }
        //Guardar datos de los planes
        for(var contcuotas=0;contcuotas<cuotasIniciales.length;contcuotas++){
          //VERIFICAR SI EL EQUIPO EXISTE EN LA BASE DE DATOS
          const existeEquipo = await Equipo.countDocuments({nombreequipo:nombreEquipo});
          if(existeEquipo == 0){//SI NO EXISTE EL QUIPO , CREAR NUEVO EQUIPO
            const nuevoEquipo = new Equipo({
              nombreequipo: nombreEquipo,
              planes:[]
            });
            await nuevoEquipo.save();
          }

          var montoMesArray= planesCuotas[contcuotas].split(" ");
          var montoMes = montoMesArray[montoMesArray.length-1];
          //VERIRFICAR SI EL PLAN EXISTE PARA EL EQUIPO
          if(cuotasIniciales[contcuotas]!="ND"){
            // ACTUALIZAR PRECIOS DE EQUIPO
            const plan = {
              tipolinea: tipoLinea,
              tipoplan:nombreTipoPlan,
              nombreplan: planesCuotas[contcuotas],
              precio: cuotasIniciales[contcuotas],
              cuotas: numeroCuotas,
              cuotainicial:cuotasIniciales[contcuotas],
              montomes: montoMes,
              cuotamensual: preciosPlanes[contcuotas]          
            };
            // VERIFICAR SI EXISTE EL PLAN
            const existePlan = await Equipo.countDocuments({nombreequipo:nombreEquipo,"planes.tipolinea": plan.tipolinea,"planes.tipoplan": plan.tipoplan,"planes.nombreplan":plan.nombreplan,"planes.cuotas": plan.cuotas});
            if(existePlan > 0){//SI  EXISTE TIPO PLAN
              await Equipo.update({nombreequipo:nombreEquipo},{$pull: {planes:{tipolinea: plan.tipolinea,tipoplan: plan.tipoplan,nombreplan:plan.nombreplan, cuotas:plan.cuotas }}});          
            }
            await Equipo.findOneAndUpdate({nombreequipo:nombreEquipo},{$push: {planes:plan}},{ new: true });
            const plan2= new Plan({
              nombreplan: plan.nombreplan,
              detalle:""
            });
            //Agregar plan si no existe
            const existePlan2 = await Plan.countDocuments({nombreplan:plan2.nombreplan});
            if(existePlan2 == 0){
              await plan2.save();
            }
          }          
        }
        console.log(nombreEquipo);
      }
    }else{ //PREPAGO Y POSTAPAGO SIN CUOTAS
      var arraynombretipoplan = hoja.split(" ");
      var nombreTipoPlan = "";
      // Obtener nombre del tipo plan
      for(var j = 0;j<arraynombretipoplan.length;j++){
        if(arraynombretipoplan[j] != "PREPAGO" && arraynombretipoplan[j] != "POSTPAGO"){
          nombreTipoPlan += arraynombretipoplan[j];
        }
      }  
      if(hoja.toUpperCase().includes("PREPAGO")){//verificar si es prepago
        tipoLinea = "PREPAGO";
        var colequipo,colprecio = "";
        var colcont = 0;
        for(var col in jsonHoja[0]){
          if(colcont == 0) colequipo = col;else colprecio = col;
          colcont++;
        }   
        // RECORRER EL JSON PRECIOS
        for(var fila = 0; fila<jsonHoja.length; fila++){
          //VERIFICAR SI EL EQUIPO EXISTE EN LA BASE DE DATOS
          const existeEquipo = await Equipo.countDocuments({nombreequipo:jsonHoja[fila][colequipo]});
          if(existeEquipo == 0){//SI NO EXISTE EL QUIPO , CREAR NUEVO EQUIPO
            const nuevoEquipo = new Equipo({
              nombreequipo: jsonHoja[fila][colequipo],
              planes:[]
            });
              console.log("EQUIPOS NUEVO: "+jsonHoja[fila][colequipo] );
              await nuevoEquipo.save();
          }
          // ACTUALIZAR PRECIOS DE EQUIPO
          const plan = {
            tipolinea: tipoLinea,
            tipoplan:nombreTipoPlan,
            nombreplan: tipoLinea+" "+nombreTipoPlan,
            precio: jsonHoja[fila][colprecio],
            cuotas:0,
            cuotainicial:0,
            montomes:0,
            cuotamensual: 0               
          };
          // VERIFICAR SI EXISTE EL PLAN
           const existePlan = await Equipo.countDocuments({nombreequipo:jsonHoja[fila][colequipo],"planes.tipolinea": plan.tipolinea,"planes.tipoplan": plan.tipoplan,"planes.nombreplan":plan.nombreplan,"planes.cuotas": plan.cuotas});
           if(existePlan > 0){//SI  EXISTE TIPO PLAN
              await Equipo.update({nombreequipo:jsonHoja[fila][colequipo]},{$pull: {planes:{tipolinea: plan.tipolinea,tipoplan: plan.tipoplan,nombreplan:plan.nombreplan, cuotas: plan.cuotas}}});          
           }
          await Equipo.findOneAndUpdate({nombreequipo:jsonHoja[fila][colequipo]},{$push: {planes:plan}},{ new: true });
          const plan2= new Plan({
            nombreplan: plan.nombreplan,
            detalle:""
          });
          //Agregar plan si no existe
          const existePlan2 = await Plan.countDocuments({nombreplan:plan2.nombreplan});
          if(existePlan2 == 0){
            await plan2.save();
          }

        }
        
      }else{// POSTPAGO
        tipoLinea = "POSTPAGO";
        // Obtener nombre de los planes postpago
        var planesPostpago = new Array();
        var colequipo = "";
        var cont=0;
        for(var plan in jsonHoja[0]){
          if(cont>0){planesPostpago.push(plan);}else{colequipo = plan;}cont++;
        }
        // RECORRER EL JSON PRECIOS
        for(var fila = 0; fila<jsonHoja.length; fila++){
          //VERIFICAR SI EL EQUIPO EXISTE EN LA BASE DE DATOS
          const existeEquipo = await Equipo.countDocuments({nombreequipo:jsonHoja[fila][colequipo]});
          if(existeEquipo == 0){//SI NO EXISTE EL QUIPO , CREAR NUEVO EQUIPO
            const nuevoEquipo = new Equipo({nombreequipo: jsonHoja[fila][colequipo],planes:[]});
            await nuevoEquipo.save();
          }
          // ACTUALIZAR PRECIOS DE EQUIPO
          for(var contplan= 0;contplan<planesPostpago.length;contplan++){
            if( jsonHoja[fila][planesPostpago[contplan]] !="ND"){
              var nombrePlan = planesPostpago[contplan].split("/")[0]; 
              nombrePlan = nombrePlan.substr(0,nombrePlan.length-1);

              var montoMesArray= nombrePlan.split(" ");
              var montoMes = montoMesArray[montoMesArray.length-1];
              const plan = {
                tipolinea: tipoLinea,
                tipoplan:nombreTipoPlan,
                nombreplan: nombrePlan,
                precio: jsonHoja[fila][planesPostpago[contplan]],
                cuotas:0,
                cuotainicial:0,
                montomes: montoMes,
                cuotamensual: 0             
              };
              
              // VERIFICAR SI EXISTE EL PLAN
              const existePlan = await Equipo.countDocuments({nombreequipo:jsonHoja[fila][colequipo],"planes.tipolinea": plan.tipolinea,"planes.tipoplan": plan.tipoplan,"planes.nombreplan":plan.nombreplan,"planes.cuotas": plan.cuotas});
              if(existePlan > 0){//SI EXISTE TIPO PLAN
                  await Equipo.update({nombreequipo:jsonHoja[fila][colequipo]},{$pull: {planes:{tipolinea: plan.tipolinea,tipoplan: plan.tipoplan,nombreplan:plan.nombreplan, cuotas:plan.cuotas}}});          
              }
              await Equipo.findOneAndUpdate({nombreequipo:jsonHoja[fila][colequipo]},{$push: {planes:plan}});
              const plan2= new Plan({
                nombreplan: plan.nombreplan,
                detalle:""
              });
              //Agregar plan si no existe
              const existePlan2 = await Plan.countDocuments({nombreplan:plan2.nombreplan});
              if(existePlan2 == 0){
                await plan2.save();
              }
            }
          }
          console.log(jsonHoja[fila][colequipo]);        
           
        }
      } 
    }
  }
  res.json({
    estado: "OK"
  });  
}
precioController.recibirExcel = async(req,res) =>{
  var workbook = new excel.Workbook(); 
  console.log('Excel file upload: '+req.file.originalname);
  workbook.xlsx.readFile('./excel/'+req.file.originalname)
    .then(function() {
      try{
        var worksheet = workbook.getWorksheet(1);
        var jsonPrecios = new Array();
        worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
          var fila = new Array();
          row.eachCell({ includeEmpty: true }, function(cell, columNumber) {
            fila.push(row.getCell(columNumber).value);
          });
          jsonPrecios.push(fila);
        });
        res.json(jsonPrecios);
      }catch(e){
        res.json({
          estado:0,
          mensaje:'Ocurrio un error',
          error:e
        });
      }
      
    });
}

precioController.guardarListaPrecios=async(req,res)=>{
  var listapreciosmongo = new Array();
  var listaprecios = req.body.precios;
  var fechavigencia = req.body.fechavigencia.substr(0,10);
  var consultaMYSQL = "INSERT INTO tapreciosventa (idArticuloGlobal, FechaVigencia,idTipoPlan,PrecioVenta,ComisionVenta,PlanActivo,PrecioVentaMinimo) VALUES ";
  for(var i = 0;i<listaprecios.length;i++){
    var fila = listaprecios[i];
    // PARA MYSQL   
    if(i == listaprecios.length-1){
      consultaMYSQL = consultaMYSQL +"('"+fila[0]+"','"+fechavigencia+"',1,"+fila[5]+" ,0,1,"+fila[6]+");"

    }else{
      consultaMYSQL = consultaMYSQL +"('"+fila[0]+"','"+fechavigencia+"',1,"+fila[5]+" ,0,1,"+fila[6]+"),"
    }    
    // PARA MONGODB
    const precio = new Precio({
      idarticuloglobal: fila[0],
      descripcion: fila[1],
      preciocomprasinigv: fila[3],
      precioventa: fila[5],
      precioventaminimo:fila[6],
      fechavigencia:req.body.fechavigencia,
      descuento:0
    });
    listapreciosmongo.push(precio);   
    
  }
  try {
    console.log("INGRESANDO PRECIOS A MYSQL");
    req.getConnection(function (error, conn) {    
      conn.query(consultaMYSQL, async function (err, results) {
        if (err) {
            res.json({
                estado: "0",
                mensaje: "ERROR: " + err
            });
        } else {
          /*console.log("GUARDANDO DATOS EN MONGODB");
          for(var i = 0;i<listapreciosmongo.length;i++){
            const precio = new Precio(listapreciosmongo[i]);
            const existePrecio = await Precio.countDocuments({idarticuloglobal:precio.idarticuloglobal});
            if(existePrecio > 0){//SI EXISTE precio
                await Precio.update({idarticuloglobal: precio.idarticuloglobal},{$set: {preciocomprasinigv:precio.preciocomprasinigv , precioventa:precio.precioventa, precioventaminimo: precio.precioventaminimo, descuento:precio.descuento, fechavigencia: precio.fechavigencia}});          
            }else{
                await precio.save();    
            }
          }*/
          res.json({estado: 1, mensaje:"Se actualizaron los precios exitosamente." , resultado: results});
        }
      });
    });
  }catch(e){
    res.json({
      estado: "0",
      mensaje: "ERROR: " + e
    });
  } 
}

precioController.obtenerPrecioArticulo= async(req,res)=>{
  try {
    req.getConnection(function (error, conn) {   
      var consultaMYSQL = "SELECT PrecioVenta AS precioventa,descuento FROM tapreciosventa WHERE idArticuloGlobal='"+req.params.idarticuloglobal+"' ORDER BY FechaVigencia DESC LIMIT 1;";
      conn.query(consultaMYSQL, async function (err, results) {
        if (err) {
            res.json({
                estado: "0",
                mensaje: "ERROR: " + err
            });
        } else {
          //const precio = await Precio.findOneAndUpdate({idarticuloglobal:req.body.idarticuloglobal},{$set:{preciocomprasinigv:req.body.preciocomprasinigv , precioventa:req.body.precioventa, precioventaminimo: req.body.precioventaminimo, descuento:req.body.descuento, fechavigencia: req.body.fechavigencia }});
          res.json(results);
        }
      });
    });
    
  }catch(e){
    res.json({
      estado: "0",
      mensaje: "ERROR: " + e
    });
  }

}
precioController.actualizarPrecio= async(req,res)=>{
  try {
    req.getConnection(function (error, conn) {   
      var date = req.body.fechavigencia;
      date = date.substr(0,10);
      var consultaMYSQL = "INSERT INTO tapreciosventa (idArticuloGlobal, FechaVigencia,idTipoPlan,PrecioVenta,ComisionVenta,PlanActivo,PrecioVentaMinimo,descuento) VALUES "+
                          "('"+req.body.idarticuloglobal+"','"+date+"',1,"+req.body.precioventa+",0,1,"+req.body.precioventaminimo+","+req.body.descuento+");";
      conn.query(consultaMYSQL, async function (err, results) {
        if (err) {
            res.json({
                estado: "0",
                mensaje: "ERROR: " + err
            });
        } else {
          //const precio = await Precio.findOneAndUpdate({idarticuloglobal:req.body.idarticuloglobal},{$set:{preciocomprasinigv:req.body.preciocomprasinigv , precioventa:req.body.precioventa, precioventaminimo: req.body.precioventaminimo, descuento:req.body.descuento, fechavigencia: req.body.fechavigencia }});
 
          res.json({estado: 1, mensaje:"Se actualizo el precio exitosamente." , resultado: results});
        }
      });
    });
    
  }catch(e){
    res.json({
      estado: "0",
      mensaje: "ERROR: " + e
    });
  }

}


//===========================================================================================0
precioController.listarplanesequipo=async(req,res)=>{
  const precioeq=await Equipo.find({
    nombreequipo:req.params.nombre,
  });
  res.json(precioeq);
}

precioController.getPlanes=async(req,res)=>{
  const planes = await Plan.find();
  res.json(planes);
}
precioController.getPreciosEquipo= async(req,res)=>{
  const planes =await Equipo.find({nombreequipo: req.params.id}).select('planes');
  res.json(planes);
}

precioController.actualizarPlan= async(req,res)=>{
  console.log("ESTA ENTRANDO A ACTUALIZAR PLAN");
  await Plan.findOneAndUpdate({_id:req.params.id},{$set:{detalle:req.body.detalle}});
  res.json({
    estado:1,
    mensaje:"Se actulizo los datos correctamente"
  });
}
precioController.eliminarPlan= async(req,res)=>{
  var id = req.params.id;
  await Plan.findOneAndDelete({_id:id});
  res.json({
    estado:1,
    mensaje:"Se elimino los datos correctamente"
  });
}

precioController.getDetallePlan = async(req,res)=>{
  const detalle = await Plan.find({nombreplan: req.params.id}).select('detalle');
  res.json(detalle);
}



module.exports = precioController;
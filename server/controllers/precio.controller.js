const Linea = require('../models/linea');
const Tipoplan = require('../models/tipoplan');
const precioController = {};
const XLSX= require('xlsx');

precioController.getPrecio= async(req,res)=>{
  
  res.send("<form action='/api/precio/subir' method='post' enctype='multipart/form-data'> <input type='file' name='excel' /> <button type='submit'></button></form>");

}
precioController.subirExcel=async(req,res)=>{
  
    console.log(req.file.originalname);
    const workbook = XLSX.readFile("./excel/"+req.file.originalname) ;
    const sheetnames = workbook.SheetNames;

    var arraytiposlinea = new Array();

    var arrayTipoPlanes = new Array();
   
    for(var i = 0;i<sheetnames.length;i++){
        var hoja = sheetnames[i];      
        var jsonHoja = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnames[i]]);
        // Variable para guardar datos de tipo linea 
        var tipolinea ={};

        if(hoja.includes("CUOTA")){
            var planespostpagocuotas12 = new Array();
            var planespostpagocuotas18 = new Array();

            var arrayTipoPlanes12 = new Array();
            var arrayTipoPlanes18 = new Array();
            //VARIABLES DE 12 Y 18 
            var tipolinea12 ={};
            var tipolinea18 ={};

            var columna1 = "";
            // sacar nombre de los planes postpago
            
            var meses = "";

            // recuperar planes para cada mes
            for(var plan in jsonHoja[0]){
              if(plan.includes("12") && ! plan.includes("EMPTY")){
                  meses = "12"  ;       
              }
              if(plan.includes("18") && ! plan.includes("EMPTY")){
                  meses = "18";
              }
              if(meses == "12"){
                planespostpagocuotas12.push(jsonHoja[0][plan]);
                arrayTipoPlanes12.push({
                  nombreplan:jsonHoja[0][plan].split("\r\n")[0],
                  descripcion: new Array()
                });
              }
              if(meses == "18"){
                planespostpagocuotas18.push(jsonHoja[0][plan]);
                arrayTipoPlanes18.push({
                  nombreplan:jsonHoja[0][plan].split("\r\n")[0],
                  descripcion: new Array()
                });
              }
            }
            //console.log(arrayTipoPlanes12);

            //Guardar datos del tipoplan
            const tipoplanes12 = new Tipoplan({
              tipo: hoja +" 12 MESES",
              planes : arrayTipoPlanes12
            });
            tipoplanes12.save();
            const tipoplanes18 = new Tipoplan({
              tipo: hoja +" 18 MESES",
              planes : arrayTipoPlanes18
            });
            tipoplanes18.save();
            //VERIFICAR SI EXISTE LA COLECCION
            const existe12 = await Linea.countDocuments({nombre: hoja+" 12 MESES"});
            const existe18 = await Linea.countDocuments({nombre: hoja +" 18 MESES"});
            if(existe12>0 && existe18>0){
                //===============================================================
                // ACTUALIZAR PRECIOS DE PLANES CUOTAS
                //===============================================================
                  // RECUPERAR EQUIPOS

                for(var filas = 1;filas < jsonHoja.length;filas++){
                  var cont = 0;
                  var contplanes12 = 0;
                  var contplanes18 = 0;
                  // recuperar planes para cada equipo
                  var nombreequipo = "";
                  var planesarticulo12meses = new Array();
                  var planesarticulo18meses = new Array();
                  for(var plan in jsonHoja[filas]){

                    if(cont == 0){
                      nombreequipo = jsonHoja[filas][plan]
                    }else{
                        if(plan.includes("12") && ! plan.includes("EMPTY")){
                          meses = "12"  ;       
                        }
                        if(plan.includes("18") && ! plan.includes("EMPTY")){
                            meses = "18";
                        }
                        if(meses == "12"){

                          if(jsonHoja[filas][plan] != "ND"){
                            var nombreplansimple = planespostpagocuotas12[contplanes12].split("\r\n")[0];
                            planesarticulo12meses.push({
                              "nombreplan": nombreplansimple,
                              "precio":jsonHoja[filas][plan]
                            });
                          }
                          contplanes12++;                          
                        }
                        if(meses == "18"){
                          if(jsonHoja[filas][plan] != "ND"){
                            var nombreplansimple = planespostpagocuotas18[contplanes18].split("\r\n")[0];
                            planesarticulo18meses.push({
                              "nombreplan": nombreplansimple,
                              "precio":jsonHoja[filas][plan]
                            });
                          }
                          contplanes18++;                          
                        }
                    }
                    cont++;
                  }

                  //actualizar planes articulo
                  

                  const equipoactualizado12 = {
                    "nombreequipo":nombreequipo,
                    "planes": planesarticulo12meses
                  }
                  const equipoactualizado18 = {
                    "nombreequipo":nombreequipo,
                    "planes": planesarticulo18meses
                  }
                  var hoja12 = hoja +" 12 MESES";
                  var hoja18 = hoja+" 18 MESES";

                  const existeequipo12 = await Linea.countDocuments({nombre:hoja12, "equipos.nombreequipo":nombreequipo});
                  if(existeequipo12>0){
                    await Linea.findOneAndUpdate({nombre:hoja12, "equipos.nombreequipo":nombreequipo},{$set: {"equipos.$":equipoactualizado12}},{ new: true });
                  }else{
                    await Linea.findOneAndUpdate({nombre:hoja12},{$push:{equipos:equipoactualizado12}});

                  }
                  const existeequipo18 = await Linea.countDocuments({nombre:hoja18, "equipos.nombreequipo":nombreequipo});
                  if(existeequipo18>0){
                    await Linea.findOneAndUpdate({nombre:hoja18, "equipos.nombreequipo":nombreequipo},{$set: {"equipos.$":equipoactualizado18}},{ new: true });
                  }else{
                    await Linea.findOneAndUpdate({nombre:hoja18},{$push:{equipos:equipoactualizado18}});

                  }


                }
                //===============================================================
            }else{
              var arraylineas1218 = new Array();
                //Asignar datos del tpo de linea
                tipolinea12.nombre = hoja + " 12 MESES";
                tipolinea12.descripcion = "";
                tipolinea12.tipo = "POSTPAGO";
                //---------------------------------------
                tipolinea18.nombre = hoja +" 18 MESES";
                tipolinea18.descripcion = "";
                tipolinea18.tipo = "POSTPAGO";

                //Arreglo de equipos
                var equipos12 = new Array();
                var equipos18 = new Array();
                meses = "";
                // RECUPERAR EQUIPOS

                for(var filas = 1;filas < jsonHoja.length;filas++){
                  var cont = 0;
                  var contplanes12 = 0;
                  var contplanes18 = 0;
                  // recuperar planes para cada equipo
                  var nombreequipo = "";
                  var planesarticulo12meses = new Array();
                  var planesarticulo18meses = new Array();
                  for(var plan in jsonHoja[filas]){

                    if(cont == 0){
                      nombreequipo = jsonHoja[filas][plan]
                    }else{
                        if(plan.includes("12") && ! plan.includes("EMPTY")){
                          meses = "12"  ;       
                        }
                        if(plan.includes("18") && ! plan.includes("EMPTY")){
                            meses = "18";
                        }
                        if(meses == "12"){

                          if(jsonHoja[filas][plan] != "ND"){
                            var nombreplansimple = planespostpagocuotas12[contplanes12].split("\r\n")[0];
                            planesarticulo12meses.push({
                              "nombreplan": nombreplansimple,
                              "precio":jsonHoja[filas][plan]
                            });
                          }
                          contplanes12++;                          
                        }
                        if(meses == "18"){
                          if(jsonHoja[filas][plan] != "ND"){
                            var nombreplansimple = planespostpagocuotas18[contplanes18].split("\r\n")[0];
                            planesarticulo18meses.push({
                              "nombreplan": nombreplansimple,
                              "precio":jsonHoja[filas][plan]
                            });
                          }
                          contplanes18++;                          
                        }
                    }
                    cont++;
                  }

                  //agregar equipo 
                  equipos12.push({
                      "nombreequipo":nombreequipo,
                      "planes": planesarticulo12meses
                  });
                  equipos18.push({
                      "nombreequipo":nombreequipo,
                      "planes": planesarticulo18meses
                  });
                }
                //asignar datos
                tipolinea12.equipos = equipos12;
                tipolinea18.equipos = equipos18;

                
                const lineanueva12 = new Linea(tipolinea12);
                await lineanueva12.save();  
                const lineanueva18 = new Linea(tipolinea18);
                await lineanueva18.save();  

            }

        }else{
            if(hoja.includes("PREPAGO")){
              // Verificar si existe el tipo de linea
              var columna1 ="";
              var columna2 = "";
              //asignar valores a los columnas
              var contcols = 0;
              for(var col in jsonHoja[0]){
                if(contcols == 0){
                  columna1 = col;
                }else{
                  columna2 = col;
                }
                contcols++;
              }
            const existetipoplan = await Tipoplan.countDocuments({tipo:hoja});
            var updatedtipoplan = new Array();
            updatedtipoplan.push({
              nombreplan: columna2,
              descripcion: new Array()
            });
            if(existetipoplan>0){
              await Tipoplan.findOneAndUpdate({tipo:hoja},{$set: {"planes":updatedtipoplan}},{ new: true });
            }else{
              const nuevotipoplan = new Tipoplan({
                tipo: hoja,
                planes: updatedtipoplan
              });
              nuevotipoplan.save();

            }


            const existe = await Linea.countDocuments({nombre: hoja});
            if(existe>0){ //sI EXISTE PREICIOS PREPAGOS ACTUALIZAR
                // ACTUALIZAR PRECIOS PREPAGO

                for(var fila =0;fila<jsonHoja.length;fila++){
                  //Arreglo de planes del equipo
                  var planes = new Array();
                  planes.push({
                    "nombreplan": columna2,
                    "precio":jsonHoja[fila][columna2]
                  });

                  const equipoactualizado = {
                    "nombreequipo":jsonHoja[fila][columna1],
                    "planes": planes
                  }

                  const existeequipo = await Linea.countDocuments({nombre:hoja, "equipos.nombreequipo":jsonHoja[fila][columna1]});
                  if(existeequipo>0){
                    await Linea.findOneAndUpdate({nombre:hoja, "equipos.nombreequipo":jsonHoja[fila][columna1]},{$set: {"equipos.$":equipoactualizado}},{ new: true });
                  }else{
                    await Linea.findOneAndUpdate({nombre:hoja},{$push:{equipos:equipoactualizado}});

                  }
                }

                console.log("ACTUALIZADO :"+hoja);
                
                //==========================================================
            }else{
                //Asignar datos del tpo de linea
                tipolinea.nombre = hoja;
                tipolinea.descripcion = "";
                tipolinea.tipo = "PREPAGO";
                //Arreglo de equipos
                var equipos = new Array();

                //recorrer todos los equipos
                for(var fila =0;fila<jsonHoja.length;fila++){
                    //Arreglo de planes del equipo
                    var planes = new Array();
                    planes.push({
                      "nombreplan": columna2,
                      "precio":jsonHoja[fila][columna2]
                    })    

                  equipos.push({
                      "nombreequipo":jsonHoja[fila][columna1],
                      "planes": planes
                  })
                }

                //asignar datos
                tipolinea.equipos = equipos;
                console.log("NUMERO DE EQUIPOS = "+equipos.length);
                //arraytiposlinea.push(tipolinea);

                console.log("NO EXISTE  :"+hoja);

                const lineanueva = new Linea(tipolinea);
                await lineanueva.save();              
            }        
          
          }else{//POSTPAGO

            var arraytipoPlanesPostpago = new Array();
              //arreglo de planes
              var planespostpago = new Array();
              var columna1 = "";
              // sacar nombre de los planes postpago
              var cont=0;
              for(var plan in jsonHoja[0]){
                if(cont>0){
                    planespostpago.push(plan);
                      
                    arraytipoPlanesPostpago.push({
                      nombreplan: plan.split('/')[0].substr(0,plan.length-1),
                      descripcion: new Array()
                    });           
                }else{
                    columna1 = plan;
                }
                cont++;
              }
              
              const existetipoplan = await Tipoplan.countDocuments({tipo:hoja});
              var updatedtipoplan = new Array();
              
              if(existetipoplan>0){
                await Tipoplan.findOneAndUpdate({tipo:hoja},{$set: {"planes":arraytipoPlanesPostpago}},{ new: true });
              }else{
                const nuevotipoplan = new Tipoplan({
                  tipo: hoja,
                  planes: arraytipoPlanesPostpago
                });
                nuevotipoplan.save();
  
              }




              const existe = await Linea.countDocuments({nombre: hoja});
              if(existe>0){
                
                // ACTULIZAR LISTA DE PRECIOS DE POSTPAGO                
                for(var fila =0;fila<jsonHoja.length;fila++){
                    //Arreglo de planes del equipo
                    var planes = new Array();
                      
                    for(var j = 0; j < planespostpago.length;j++){
                      var nombreplanpost = planespostpago[j].split("/")[0];
                      nombreplanpost = nombreplanpost.substr(0,nombreplanpost.length-1);
                      planes.push({
                        "nombreplan": nombreplanpost,
                        "precio":jsonHoja[fila][planespostpago[j]]
                      }) 
                    }
                    const equipoactualizado = {
                      "nombreequipo":jsonHoja[fila][columna1],
                      "planes": planes
                    }
                    const existeequipo = await Linea.countDocuments({nombre:hoja, "equipos.nombreequipo":jsonHoja[fila][columna1]});
                    if(existeequipo>0){
                      await Linea.findOneAndUpdate({nombre:hoja, "equipos.nombreequipo":jsonHoja[fila][columna1]},{$set: {"equipos.$":equipoactualizado}},{ new: true });
                    }else{
                      await Linea.findOneAndUpdate({nombre:hoja},{$push:{equipos:equipoactualizado}});

                    }
                }

                //==================================


                console.log("ACTUALIZADO :"+hoja);
              }else{
              

              //asignar datos a la linea
              tipolinea.nombre = hoja;
              tipolinea.descripcion = "";
              tipolinea.tipo = "POSTPAGO";

              //RECUPERAR EQUIPOS DEL EXCEL
              var equipos = new Array();
              //recorrer todos los equipos
              for(var fila =0;fila<jsonHoja.length;fila++){
                  //Arreglo de planes del equipo
                  var planes = new Array();
                    
                  for(var j = 0; j < planespostpago.length;j++){
                    var nombreplanpost = planespostpago[j].split("/")[0];
                    nombreplanpost = nombreplanpost.substr(0,nombreplanpost.length-1);
                    planes.push({
                      "nombreplan": nombreplanpost,
                      "precio":jsonHoja[fila][planespostpago[j]]
                    }) 
                  }

                  equipos.push({
                      "nombreequipo":jsonHoja[fila][columna1],
                      "planes": planes
                  })
              }
              //asignar datos
              tipolinea.equipos = equipos;
              //console.log("NUMERO DE EQUIPOS = "+equipos.length);
              arraytiposlinea.push(tipolinea);

              //console.log("NO EXISTE  :"+hoja);
              const lineanueva = new Linea(tipolinea);
              await lineanueva.save();         
            } 
          }

        } 
      
    }
    res.json({
      mensaje: "SE ACTUALIZO PRECIOS"
    });
     
    //res.json("SE GUARDO CON EXITO");
}

/*subirPreciosPrepago = ()=>{

}*/


module.exports = precioController;
const Equipo = require('../models/equipos');
const Linea = require('../models/linea');//TEMP
const Tipoplan = require('../models/tipoplan');
const precioController = {};
const XLSX= require('xlsx');

precioController.getPrecio= async(req,res)=>{
  const tipoplanes = await Tipoplan.find();
  res.json(tipoplanes);
}

precioController.getPlanesEquipos = async(req, res)=>{
  const precios = await Linea.find();
  res.json(precios);
}
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

          //VERIRFICAR SI EL PLAN EXISTE PARA EL EQUIPO
          if(cuotasIniciales[contcuotas]!="ND"){
            // ACTUALIZAR PRECIOS DE EQUIPO
            const plan = {
              tipolinea: tipoLinea,
              tipoplan:nombreTipoPlan,
              nombreplan: planesCuotas[contcuotas],
              precio: preciosPlanes[contcuotas],
              cuotas: numeroCuotas,
              cuotainicial:cuotasIniciales[contcuotas]            
            };
            // VERIFICAR SI EXISTE EL PLAN
            const existePlan = await Equipo.countDocuments({nombreequipo:nombreEquipo,"planes.tipolinea": plan.tipolinea,"planes.tipoplan": plan.tipoplan,"planes.nombreplan":plan.nombreplan,"planes.cuotas": plan.cuotas});
            if(existePlan > 0){//SI  EXISTE TIPO PLAN
              await Equipo.update({nombreequipo:nombreEquipo},{$pull: {planes:{tipolinea: plan.tipolinea,tipoplan: plan.tipoplan,nombreplan:plan.nombreplan}}});          
            }
            await Equipo.findOneAndUpdate({nombreequipo:nombreEquipo},{$push: {planes:plan}},{ new: true });
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
            cuotainicial:0            
          };
          // VERIFICAR SI EXISTE EL PLAN
           const existePlan = await Equipo.countDocuments({nombreequipo:jsonHoja[fila][colequipo],"planes.tipolinea": plan.tipolinea,"planes.tipoplan": plan.tipoplan,"planes.nombreplan":plan.nombreplan});
           if(existePlan > 0){//SI  EXISTE TIPO PLAN
              await Equipo.update({nombreequipo:jsonHoja[fila][colequipo]},{$pull: {planes:{tipolinea: plan.tipolinea,tipoplan: plan.tipoplan,nombreplan:plan.nombreplan}}});          
           }
          await Equipo.findOneAndUpdate({nombreequipo:jsonHoja[fila][colequipo]},{$push: {planes:plan}},{ new: true });
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
              const plan = {
                tipolinea: tipoLinea,
                tipoplan:nombreTipoPlan,
                nombreplan: nombrePlan,
                precio: jsonHoja[fila][planesPostpago[contplan]],
                cuotas:0,
                cuotainicial:0            
              };
              
              // VERIFICAR SI EXISTE EL PLAN
              const existePlan = await Equipo.countDocuments({nombreequipo:jsonHoja[fila][colequipo],"planes.tipolinea": plan.tipolinea,"planes.tipoplan": plan.tipoplan,"planes.nombreplan":plan.nombreplan});
              if(existePlan > 0){//SI EXISTE TIPO PLAN
                  await Equipo.update({nombreequipo:jsonHoja[fila][colequipo]},{$pull: {planes:{tipolinea: plan.tipolinea,tipoplan: plan.tipoplan,nombreplan:plan.nombreplan}}});          
              }
              await Equipo.findOneAndUpdate({nombreequipo:jsonHoja[fila][colequipo]},{$push: {planes:plan}});
              
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

precioController.actualizarPlan=async(req,res)=>{  
  await Tipoplan.findOneAndUpdate({tipo:req.params.id, "planes.nombreplan":req.body.nombreplan},{$set: {"planes.$":req.body}},{ new: true });
  res.json({
    estado:1,
    mensaje:"Se actualizaron los datos correctamente"
  });
}

precioController.eliminarPlan=async(req,res)=>{
  console.log(req.body);
  console.log(req.params.id)
  const updateplan = {
    descripcion: req.body.descripcion,
    nombreplan: req.body.nombreplan
  }
  await Tipoplan.findOneAndUpdate({tipo:req.params.id},{$pull:{planes:{nombreplan: req.body.nombreplan}}});
  res.json({
    estado:1,
    mensaje:"Se elimino los datos correctamente"
  });
}
precioController.listarplanesequipo=async(req,res)=>{
  const precioeq=await Equipo.find({
    nombreequipo:req.params.nombre,
  });
  res.json(precioeq);
}
/*subirPreciosPrepago = ()=>{

}*/


module.exports = precioController;
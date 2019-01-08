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
  const precios = await Linea.find({"equipos.nombreequipo": id},"nombre").select({equipos:{$elemMatch:{nombreequipo:req.params.id}}});
  var preciosequipo = new Array();
  for(var i=0;i<precios.length;i++){
    preciosequipo.push({
      tipoplan: precios[i].nombre,
      planes: precios[i].equipos[0].planes
    });
  }
  
  res.json(preciosequipo);
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
              lineas:[
                {tipo:"PREPAGO", tipoplanes:[]},
                {tipo:"POSTPAGO", tipoplanes:[]}
                    ]
            });
              console.log("EQUIPOS NUEVO: "+jsonHoja[fila][colequipo] );
              await nuevoEquipo.save();
          }
          // ACTUALIZAR PRECIOS DE EQUIPO
          const tipoplanEquipo = {
            nombre: nombreTipoPlan,
            cuotas:0,
            planes:[{
              nombreplan: colprecio,
              precio: jsonHoja[fila][colprecio]
            }]
          };

          // VERIFICAR SI EXISTE EL TIPOPLAN( PORTABILIAD, RENOCACION O ALTA)
           const existeTipoPlan = await Equipo.countDocuments({nombreequipo:jsonHoja[fila][colequipo], "lineas.tipo": tipoLinea,"lineas.tipoplanes.nombre": nombreTipoPlan});
           if(existeTipoPlan == 0){//SI NO EXISTE TIPO PLAN
            await Equipo.findOneAndUpdate({nombreequipo:jsonHoja[fila][colequipo], "lineas.tipo":tipoLinea},{$push: {"lineas.$.tipoplanes":tipoplanEquipo}},{ new: true });
            console.log("ACTUAALIZADO TIPO PLAN :"+tipoplanEquipo.nombre);
           }






        }
        
      }else{// POSTPAGO
        
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

/*subirPreciosPrepago = ()=>{

}*/


module.exports = precioController;
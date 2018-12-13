const Articulo = require('../models/articulo');
const Categoria = require('../models/categoria');
const articuloController = {};
var jsonArticulos;



articuloController.obtenerArticulosMysql = async( req, res)=>{
    try{       

        req.getConnection(function (error, conn){
            var consulta = "SELECT * FROM (SELECT idArticulo, Descripcion, fnAS_StockArticulo(idArticulo) AS Cantidad FROM taarticulo WHERE idTipoProducto='1') tmp WHERE tmp.Cantidad>0";
            conn.query(consulta, async function(err, results) {
                if (err){
                    console.log(err);
                    res.json({
                        estado :"0",
                        mensaje:"ERROR: "+err
                    });
                }else{
                    jsonArticulos = JSON.parse(JSON.stringify(results));                    
                    for(var i = 0;i<jsonArticulos.length;i++){                      
                        await verificarArticulosMongo(jsonArticulos[i].idArticulo,i);
                    }
                    res.json(jsonArticulos);
                   // console.log(jsonArticulos);
                    
                } 
            });
            if(error){
                console.log(error);
                res.json(error);
            }
        });

        
    }catch(e){
        console.log(e);
    }
    
}

verificarArticulosMongo = async (id,i)=>{
    try{
       /* const articulomongo = await Articulo.find({
            idarticulo:id
        });   
           
        
        if(articulomongo.length>0){
            const categoriamongo = await Categoria.findById(articulomongo[0].categoria);
            jsonArticulos[i].Categoria = categoriamongo.nombre;
            jsonArticulos[i].Estado = "1";
            console.log(jsonArticulos[i]);  
        }else{
            jsonArticulos[i].Categoria = "SIN CATEGORIA";
            jsonArticulos[i].Estado = "0";
        }*/

        //codigo temporal
        jsonArticulos[i].Categoria = "SIN CATEGORIA";
        jsonArticulos[i].Estado = "0";
    }catch(e){
        console.log("currio un error");
    }

}
articuloController.obtenerArticulo = async(req,res)=>{
    const articulo = await Articulo.find({
        idarticulo:req.params.id
    });
    res.json(articulo);

}
articuloController.obtenerArticuloURL = async(req, res)=>{
    const articulo = await Articulo.find({
        url:req.params.id
    });
    res.json(articulo);
}

articuloController.crearArticulo= async (req, res) => {
    try{
        const articulo = new Articulo(req.body);
        if(articulo){
            await articulo.save();
            res.json({
                estado:1,
                mensaje:"Articulo se guardo con exito."
            });
        }else{
            res.json({
                estado:0,
                mensaje:"ERROR: Complete todos los datos."
            });
        }
        
        
        
    }catch(e){  
        console.log(e);
        res.json({  
            estado:0,
            mensaje:"ERROR :"+e
        });

    }
}


articuloController.actualizarArticulo= async (req, res) => {
    try{
        const articulo = new Articulo(req.body);
        if(articulo){
            await articulo.save();
            res.json({
                estado:1,
                mensaje:"Articulo se actualizo con exito."
            });
        }else{
            res.json({
                estado:0,
                mensaje:"ERROR: Complete todos los datos."
            });
        }
        
        
        
    }catch(e){  
        console.log(e);
        res.json({  
            estado:0,
            mensaje:"ERROR :"+e
        });

    }
}



articuloController.actualizarArticulo = async(req,res)=>{
    try{
        const art = {
            idarticulo: req.body.idarticulo,
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            marca: req.body.marca,
            cantidad: req.body.cantidad,
            precio:req.body.precio,
            especificaciones: req.body.especificaciones,
            caracteristicas: req.body.caracteristicas,
            imagenes: req.body.imagenes,
            descripcion: req.body.descripcion,
            garantias: req.body.garantias
        }
        const articulo = await Articulo.findOneAndUpdate({_id:req.params.id},{$set: art},{new: true});        
        res.json({
            estado:1,
            mensaje:"Se actualizaron los datos correctamente"
        });       
        
    }catch(err){
        res.json({
            estado:0,
            mensaje:" No se pudo actulizar los datos de la categoria : ERROR:"+ err                  
            
        });
    }

}


articuloController.eliminarArticulo = async (req,res)=>{
    
}

articuloController.listararticulos = async(req,res )=>{
    const articulos =await Articulo.find();
    res.json(articulos);
}
//articuloController.buscararti=async(req,res)=>{
    //const articbus=await Articulo.find({"titulo": /.*DATO.*/});
  //  res.json(articbus);
//}

articuloController.buscararti = async (req, res) => {
    const articulosB=await Articulo.find({"titulo":{$regex:'.*'+req.params.titulo+'.*',$options: 'i'}}); //await Articulo.find({"titulo": consul});
    res.json(articulosB);
}

module.exports = articuloController;
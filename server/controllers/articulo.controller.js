const Articulo = require('../models/articulo');
const articuloController = {};



articuloController.obtenerArticulosMysql = async( req, res)=>{
    try{
        req.getConnection(function (error, conn){
            var consulta = "SELECT * FROM (SELECT idArticulo, Descripcion, fnAS_StockArticulo(idArticulo) AS Cantidad FROM taarticulo WHERE idTipoProducto='1') tmp WHERE tmp.Cantidad>0";
            conn.query(consulta, function (err, results) {
                if (err){
                    console.log(err);
                    res.json({
                        estado :"0",
                        mensaje:"ERROR: "+err
                    });
                }else{
                    var jsonArticulos = JSON.parse(JSON.stringify(results));
                    
                    for(var i = 0;i<jsonArticulos.length;i++){
                        const articulomongo = Articulo.findOne({
                            idarticulo:jsonArticulos[i].idArticulo
                        });     
                        if(articulomongo.length>0){
                            jsonArticulos[i].Categoria = articulomongo.categoria;
                            jsonArticulos[i].Estado = "1";
                        }else{
                            jsonArticulos[i].Categoria = "SIN CATEGORIA";
                            jsonArticulos[i].Estado = "0";
                        }
                        
                    }
                    res.json(jsonArticulos);
                } 
            });
            if(error){
                console.log(error);
            }
        });
    }catch(e){
        console.log(e);
    }
    
}
articuloController.obtenerArticulo = async(req,res)=>{
    const articulo = await Articulo.find({
        id:req.params.id
    });
    res.json(categoria);

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


module.exports = articuloController;
const Articulo = require('../models/articulo');
const articuloController = {};



articuloController.obtenerArticulosMysql = async( req, res)=>{
    req.getConnection(function (error, conn){
        var consulta = "SELECT idArticulo, Descripcion FROM taarticulo WHERE fnAS_StockArticulo(idArticulo) > 0 AND idTipoProducto='1'";
        conn.query(consulta, function (err, results) {
            if (err){
                console.log(err);
            }else{
                res.json(results);
            } 
            
        });
    });
    
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
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            padre: req.body.padre
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
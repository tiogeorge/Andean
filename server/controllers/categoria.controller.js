const Categoria = require('../models/categoria');
const categoriaController = {};

categoriaController.obtenerCategorias = async( req, res)=>{
    const categorias = await Categoria.find();
    res.json(categorias);
}
categoriaController.obtenerCategoria = async(req,res)=>{
    const categoria = await Categoria.find({
        id:req.params.id
    });
    res.json(categoria);

}
categoriaController.crearCategoria = async (req, res) => {
    try{
        const categoria = new Categoria(req.body);
        await categoria.save();
        res.json({
            estado:"guardado"
        });
    }catch(e){  
        res.json({
            estado:"error",
            mensaje:e
        });
    }
};
categoriaController.actualizarCategoria = async(req,res)=>{
    try{
        const cat = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            padre: req.body.padre
        }
        const categoria = await Categoria.findOneAndUpdate({id:req.params.id},{$set: cat},{new: true});        
        res.json({
            status:1,
            mensaje:"Se actuAlizaron los datos correctamente"
        });       
        
    }catch(err){
        res.json({
            status:0,
            mensaje:" No se pudo actulizar los datos de la categoria : ERROR:"+ err                  
            
        });
    }

}
categoriaController.eliminarCategoria = async (req,res)=>{
    try{
        
        const categoria = await Categoria.remove({id:req.params.id});        
        res.json({
            status:1,
            mensaje:"Se elimino los datos correctamente"
        });       
        
    }catch(err){
        res.json({
            status:0,
            mensaje:" No se pudo eliminar los datos de la categoria : ERROR:"+ err                  
            
        });
    }
}


module.exports = categoriaController;
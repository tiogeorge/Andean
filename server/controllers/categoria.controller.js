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
    const categoria = await Categoria.find({
        id:req.params.id
    });
    res.json(categoria);

}


module.exports = categoriaController;
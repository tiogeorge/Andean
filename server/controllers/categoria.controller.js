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
categoriaController.obtenerSubCategorias= async(req,res)=>{
    const categorias = await Categoria.find({
        padre:req.params.id
    });
    res.json(categorias);
}
categoriaController.crearCategoria = async (req, res) => {
    try{
        const categoria = new Categoria(req.body);
        if(categoria.nombre && categoria.descripcion && categoria.padre && categoria.imagen){
            await categoria.save();
            res.json({
                estado:1,
                mensaje:"Categoria se guardo con exito."
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
};
categoriaController.actualizarCategoria = async(req,res)=>{
    try{
        const cat = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            padre: req.body.padre,
            caracteristicas: req.body.caracteristicas
        }
        const categoria = await Categoria.findOneAndUpdate({_id:req.params.id},{$set: cat},{new: true});        
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


categoriaController.eliminarCategoria = async (req,res)=>{
    try{
        const categoriashijo = await Categoria.find({
            padre:req.params.id
        });
        if(categoriashijo.length>0){
            res.json({  
                estado:0,
                mensaje:"Esta Categoria tiene Subactegorias. Primero tienes que eliminar las SubCategorias"
            });  
        }else{
            const categoria = await Categoria.remove({_id:req.params.id});        
            res.json({  
                estado:1,
                mensaje:"Se elimino los datos correctamente"
            });    
        }   
        
    }catch(err){
        res.json({
            estado:0,
            mensaje:" No se pudo eliminar los datos de la categoria : ERROR:"+ err                  
            
        });
    }
}
categoriaController.listarcategoria=async(req,res)=>{
    const categoriaart=await Categoria.find({"descripcion":{$regex:'.*'+req.params.descripcion+'.*',$options: 'i'}},'_id');
    res.json(categoriaart);
}

module.exports = categoriaController;
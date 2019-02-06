const Categoria = require('../models/categoria');
const categoriaController = {};

/**
 * Método que obtiene todas las categorias
 */
categoriaController.obtenerCategorias = async( req, res)=>{
    const categorias = await Categoria.find();
    res.json(categorias);
}

/**
 * Método que obtiene una categoria dado su identificador
 */
categoriaController.obtenerCategoria = async(req,res)=>{
    const categoria = await Categoria.find({
        _id: req.params.id
    });
    res.json(categoria);
}
// Método que obtiene las categorias padre
/*categoriaController.obtenerCategoriapadre=async(req,res)=>{
    const categoria=await Categoria.find({
        padre:req.params.padre
    });
    res.json(categoria);
}*/
categoriaController.obtenerCategoriapadre=async(req,res)=>{
    const categoriap=await Categoria.find({ padre:req.params.padre});
    var jsoncategoriap = JSON.parse(JSON.stringify(categoriap));
    for(var i=0;i<categoriap.length;i++){
        var id=categoriap[i]._id
        const categoriah =await Categoria.find({padre:id});
        var arreglohijos=new Array();
        arreglohijos.push(categoriah);
      /*  for(var j=0;j<categoriah.length;j++){
            arreglohijos.push(categoriah[j]._id);
            arreglohijos.push(categoriah[j].nombre);
        }*/
        jsoncategoriap[i].hijos=arreglohijos;
    }
    res.json(jsoncategoriap);
}

/**
 * Método que obtiene las subcategorias de una categoria
 */
categoriaController.obtenerSubCategorias= async(req,res)=>{
    const categorias = await Categoria.find({
        padre:req.params.id
    });
    res.json(categorias);
}

/**
 * Método que crea una nueva categoría
 */
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

/**
 * Método que actualiza una categoría
 */
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

/**
 * Método que elimina una categoría
 */
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

/**
 * Método que lista categorias
 */
categoriaController.listarcategoria=async(req,res)=>{
    const categoriaart=await Categoria.find({"descripcion":{$regex:'.*'+req.params.descripcion+'.*',$options: 'i'}},'_id');
    res.json(categoriaart);
}

module.exports = categoriaController;
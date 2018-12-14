const Valoracion = require('../models/valoracion');
const valoracionController = {};

valoracionController.obtenerValoracionesArticulo = async( req, res)=>{
    const valoraciones = await Valoracion.find({
        idarticulo:req.params.id
    });
    res.json(valoraciones);
}

valoracionController.obtenerPuntuacionArticulo = async(req,res)=>{
    /*const puntuacion1 =await Valoracion.count({puntuacion:1, idarticulo: req.params.id});
    const puntuacion2 =await Valoracion.count({puntuacion:1});
    const puntuacion3 =await Valoracion.count({puntuacion:1});
    const puntuacion4 =await Valoracion.count({puntuacion:1});
    const puntuacion5 =await Valoracion.count({puntuacion:1});
    var total = puntuacion1+puntuacion2+puntuacion3+puntuacion4+puntuacion5;    
    var puntuacionprommedio = ((puntuacion1*1)+(puntuacion2*2)+(puntuacion3*3)+(puntuacion4*4)+(puntuacion5*5))/total;
    res.json({
        estado:1,
        promedio: puntuacionprommedio
    })    */
}
valoracionController.crearValoracion = async (req, res) => {
    try{
        const valoracion = new Valoracion(req.body);
        if(valoracion.cliente && valoracion.comentario && valoracion.idarticulo){
            await valoracion.save();
            res.json({
                estado:1,
                mensaje:"Comentario se guardo con exito."
            });
        }else{
            res.json({
                estado:0,
                mensaje:"Ingrese un comentario"
            });
        }     
    }catch(e){  
        res.json({  
            estado:0,
            mensaje:"ERROR :"+e
        });
    }
}

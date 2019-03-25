const Valoracion = require('../models/valoracion');
const valoracionController = {};


/* Prueba */
valoracionController.obtenerValoraciones = async (req, res, next) => {
    const valoraciones = await Valoracion.find();
    res.json(valoraciones);
}

/* Obtener comentarios de un articulo */
valoracionController.obtenerValoracionArticulo = async (req, res) => {
    const valoraciones = await Valoracion.find({
        idarticulo: req.params.idarticulo
    }).sort({fecha:-1});
    res.json(valoraciones);
}

/* Obtener comentarios de un articulo menos del cliente Actual*/
valoracionController.obtenerValoracionArticuloSinCliente = async (req, res) => {
    const valoraciones = await Valoracion.find({
        idarticulo: req.params.idarticulo,
        cliente: { $ne: req.params.cliente }
    }).sort({fecha:-1});
    res.json(valoraciones);
}

/* obtener promedio de valoracion */
valoracionController.promediovaloracion=async (req,res)=>{
    const valoraciones=await Valoracion.find({idarticulo:req.params.idarticulo},'puntuacion')
    var cantidadcomen=valoraciones.length;
    var sumapuntuacion=0;
    for(var i=0;i<cantidadcomen;i++){
        sumapuntuacion += valoraciones[i].puntuacion;
    }
    var promedioTotal=sumapuntuacion/cantidadcomen;
    var promredondado=Math.round(promedioTotal);
    res.json(promredondado);
}

/* Obtener comentario de un cliente respecto de un articulo */
valoracionController.obtenerValoracionArticuloCliente = async (req, res) => {
    const valoraciones = await Valoracion.find({
        idarticulo: req.params.idarticulo,
        cliente: req.params.cliente
    });
    res.json(valoraciones);
}

/* Crear una valoracion nueva */
valoracionController.crearValoracionArticulo = async (req, res) => {

    try {
        const valoracionExiste = await Valoracion.find({
            idarticulo: req.body.idarticulo,
            cliente: req.body.cliente
        });

        if (valoracionExiste.length == 0) {
            const valoracion = new Valoracion(req.body);
            if (valoracion) {
                await valoracion.save();
                res.json({
                    estado: 1,
                    mensaje: "Comentario Guardado"
                });
            } else {
                res.json({
                    estado: 0,
                    mensaje: "Error, comentario no valido"
                });
            }
        }
        else {
            res.json({
                estado: 0,
                mensaje: "Comentario ya existe"
            });
        }
    } catch (e) {
        res.json({
            estado: 0,
            mensaje: "ERROR :" + e
        });
    }
}

/* Editar una valoracion */
valoracionController.actualizarValoracionArticuloCliente = async (req, res) => {
    try {
        const valoracion = {
            puntuacion: req.body.puntuacion,
            comentario: req.body.comentario
        }
        if (valoracion) {
            await Valoracion.findOneAndUpdate(
                {
                    idarticulo: req.params.idarticulo,
                    cliente: req.params.cliente
                },
                { $set: valoracion },
                { new: true }
            );
            res.json({
                estado: 1,
                mensaje: "Comentario Actualizado"
            });
        } else {
            res.json({
                estado: 0,
                mensaje: "Error, comentario no valido"
            });
        }
    } catch (e) {
        res.json({
            estado: 0,
            mensaje: "ERROR :" + e
        });
    }
}

valoracionController.eliminarValoracionArticuloCliente = async (req, res, next) => {
    await Valoracion.findOneAndRemove(
        {
            idarticulo: req.params.idarticulo,
            cliente: req.params.cliente
        }, function (err) {
            if (err) {
                res.json({
                    status: false,
                    error: 'Se produjo el siguiente error al eliminar la valoracion del cliente del articulo' + err
                });
            } else {
                res.json({
                    status: true,
                    msg: 'La valoracion del cliente respecto del artciculo ha sido eliminada'
                })
            }
        })
};


module.exports = valoracionController;
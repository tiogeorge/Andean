const Distribuidor = require('../models/distribuidor');
const distribuidorcontroller = {};

distribuidorcontroller.obtenerDistriMysql = async (req, res) => {
    req.getConnection(function (error, conn) {
        var consulta = "SELECT idProveedorRUC, RazonSocial, NombreRepresentante,DNIRepresentante,TelefonoA,CorreoElectronico,Web,fnRep_NombreCiudad(IdCiudad) AS 'Ciudad',Direccion FROM `taproveedor` WHERE Activo='S'";
        conn.query(consulta, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(results);
            }
        });
    });
}

distribuidorcontroller.obtenerDistri = async (req, res) => {
    const distri = await Distribuidor.find();
    res.json(distri);
}

distribuidorcontroller.crearDistri = async (req, res) => {
    try {
        const distri = new Distribuidor(req.body);
        if (distri) {
            await distri.save();
            res.json({
                mensaje: "Distribuidor guardado con exito."
            });
        }
        else {
            res.json({
                mensaje: "ERROR:complete los datos."
            })
        }
    }
    catch (e) {
        res.json({
            mensaje: "ERROR :" + e
        });
    }
}

distribuidorcontroller.obtenerDistri = async (req, res) => {
    const distri = await Distribuidor.findById(req.params.id);
    res.json(distri);
}

distribuidorcontroller.editarDistri = async (req, res) => {
    try {
        const dist = {
            RazonSocial: req.body.RazonSocial,
            NombreRepresentante: req.body.NombreRepresentante,
            DNIRepresentante: req.body.DNIRepresentante,
            Telefono: req.body.Telefono,
            CorreoElectronico: req.body.CorreoElectronico,
            Web: req.body.Web,
            Ciudad: req.body.Ciudad,
            Direccion: req.body.Direccion,
        }
        const distri= await Distribuidor.findByIdAndUpdate({_id:req.params.id},{$set: art},{new: true});
        res.json({
            mensaje:"Se actualizaron los datos correctamente"
        });
    }
    catch(err){
        res.json({
            mensaje:"No se pudo actualizar los datos: ERROR:" +err
        })
    }
}

module.exports=distribuidorcontroller;
const Distribuidor=require('../models/distribuidor');
const distribuidorcontroller={};

distribuidorcontroller.obtenerDistriMysql= async(req,res)=>{
    req.getConnection(function(error,conn){
        var consulta ="";
        conn.query(consulta, function(err,results){
            if(err){
                console.log(err);
            }
            else{
                res.json(results);
            }
        });
    });
}

distribuidorcontroller.obtenerDistri=async(req,res)=>{
    const distri=await Distribuidor.find();
    res.json(distri);
}

distribuidorcontroller.crearDistri=async(req,res)=>{
    try{
        const distri=new Distribuidor(req.body);
        if(distri){
            await distri.save();
            res.json({
                mensaje:"Distribuidor guardado con exito."
            });
        }
        else{
            res.json({
                mensaje:"ERROR:complete los datos."
            })
        }
    }
    catch(e){
        res.json({
            mensaje:"ERROR :" +e
        });
    }
}

distribuidorcontroller.obtenerDistri= async (req,res)=>{
    const distri= await Distribuidor.findById(req.params.id);
    res.json(distri);
} 
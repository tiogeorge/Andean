const Marca=require('../models/marca');
const marcacontroller={};

marcacontroller.obtenerMarcaMysql = async( req, res)=>{
    req.getConnection(function (error, conn){
        var consulta = "SELECT * FROM `tamarcaproducto`";
        conn.query(consulta, function (err, results) {
            if (err){
                console.log(err);
            }else{
                res.json(results);
            } 
            
        });
    });
    
}

marcacontroller.obtenerMarcas= async (req, res) =>{
    const marcas = await Marca.find();
    res.json(marcas);
}

marcacontroller.crearMarca= async (req,res)=>{
    const marca=new Marca({
        nombremarca:req.body.nombremarca
    });
    await marca.save();
    res.json({
        'status': 'Marca registrada'
    });
}

marcacontroller.obtenermarca= async (req,res)=>{
    const marca= await Marca.findById(req.params.id);
    res.json(marca);
}

marcacontroller.editarmarca= async (req,res)=>{
    const {id}=req.params;
    const marca={
        nombremarca:req.body.nombremarca
    };
    await Employee.findByIdAndUpdate(id,{$set:employee},{new:true});
    res.json({'status':'Marca Actualizada'});
}

marcacontroller.eliminar=async (req,res)=>{
    await Marca.findByIdAndRemove(req.params.id);
    res.json({'status':'Marca Eliminada'})
}

module.exports=marcacontroller;
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
         idMarca:req.body.idMarca,
         nombremarca:req.body.nombremarca,
         descripcion:req.body.descripcion,
         imagen:req.body.imagen,
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
marcacontroller.listarmarca=async(req,res)=>{
    const marcaarti= await Marca.find({"nombremarca":{$regex:'.*'+req.params.nombremarca+'.*',$options: 'i'}},'_id');
    res.json(marcaarti);
}

module.exports=marcacontroller;
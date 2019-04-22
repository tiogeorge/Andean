const Marca=require('../models/marca');
const marcacontroller={};

var jsonMarcas;
marcacontroller.obtenerMarcaMysql = async( req, res)=>{
    req.getConnection(function (error, conn){
        var consulta = "SELECT * FROM `tamarcaproducto`";
        conn.query(consulta, async function (err, results) {
            if (err){
                console.log(err);
            }else{
                

                jsonMarcas = JSON.parse(JSON.stringify(results));
                for (var i = 0; i < jsonMarcas.length; i++) {
                    await verificarMarcaMongo(jsonMarcas[i].NombreMarca, i);
                }
                res.json(jsonMarcas);
            }             
        });
    });    
}
verificarMarcaMongo = async (nombre, i) => {
    try {
        const marcamongo = await Marca.find({
            nombremarca: nombre
        });

        if (marcamongo.length > 0) {
            jsonMarcas[i].Estado = "1";
            jsonMarcas[i].idMarca = marcamongo[0]._id;

        } else {
            jsonMarcas[i].Estado = "0";
        }

    } catch (e) {
        console.log("currio un error");
    }

}
marcacontroller.obtenerMarcas= async (req, res) =>{
    const marcas = await Marca.find();
    res.json(marcas);
}

marcacontroller.crearMarca= async (req,res)=>{
    const marca=new Marca({
        nombremarca:req.body.nombremarca,
        descripcion:req.body.descripcion,
        imagen:req.body.imagen,
    });
    if(req.body._id){
        console.log("existe marca "+req.body.nombremarca);
        const marcaactualizada = await Marca.findByIdAndUpdate({_id:req.body._id},{$set:{
            nombremarca:req.body.nombremarca,
            descripcion:req.body.descripcion,
            imagen:req.body.imagen
        }},{new:true});
        console.log(req.body);
    }else{        
        console.log("NO EXISTE marca "+req.nombremarca);
        await marca.save();
        
    }
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
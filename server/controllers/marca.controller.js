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

marcacontroller.getMarcas= async (req, res) =>{
    const marcas = await Marca.find();
    res.json(marcas);
}
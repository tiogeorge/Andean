const mongoose= require('mongoose');
const {Schema}=mongoose;

const marcaSchema= new Schema({
    idMarca:{type:String, require:true},
    nombremarca:{type:String, required: true},
    descripcion:{type:String, require:true},
    imagen:{type:String},
});

module.exports= mongoose.model('Marca',marcaSchema);
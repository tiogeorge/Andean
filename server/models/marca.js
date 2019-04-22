const mongoose= require('mongoose');
const {Schema}=mongoose;

const marcaSchema= new Schema({
    nombremarca:{type:String, required: true},
    descripcion:{type:String, require:true},
    imagen:{type:String},
});

module.exports= mongoose.model('Marca',marcaSchema);
const mongoose= require('mongoose');
const {Schema}=mongoose;

const marcaSchema= new Schema({
    nombremarca:{type:String, required: true},
});

module.exports= mongoose.model('Marca',marcaSchema);
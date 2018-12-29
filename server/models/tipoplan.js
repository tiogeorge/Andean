const mongoose= require('mongoose');
const {Schema}=mongoose;

const tipoplanSchema= new Schema({
    tipo:{type:String, require:true},
    planes:[{
        _id:false,
        nombreplan:{type:String, require: true},
        descripcion:String
    }]
});

module.exports= mongoose.model('Tipoplanes',tipoplanSchema);
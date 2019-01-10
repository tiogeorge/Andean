const mongoose= require('mongoose');
const {Schema}=mongoose;

const tipoplanSchema= new Schema({
    tipolinea:{type:String, required:true},
    tipoplan:{type:String, requireed:true},
    cuotas:{type: Number, required:true},
    planes:[{
            nombreplan:{type:String, require: true},  
            descripcion:{type: String, required: true}
        }
    ]   

});

module.exports= mongoose.model('Tipoplanes',tipoplanSchema);
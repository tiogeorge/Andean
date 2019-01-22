const mongoose= require('mongoose');
const {Schema}=mongoose;

const planSchema= new Schema({
    nombreplan:{type:String, required:true},
    detalle:{type:String, required:false} 

});

module.exports= mongoose.model('Planes',planSchema);
const mongoose= require('mongoose');
const {Schema}=mongoose;    

const lineaSchema= new Schema({
    nombre:{type:String, required: true},
    descripcion:{type:String, required:false},
    tipo:{type: String, required:true},
    equipos:[
        {
            _id:false,
            nombreequipo:{type:String, required: true},
            planes:[{
                _id:false,
                nombreplan:{type: String, required:true},
                precio:{type: Number, required: true}
            }]
        }
    ]

});

module.exports= mongoose.model('Precio',lineaSchema);
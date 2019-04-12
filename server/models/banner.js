const mongoose = require('mongoose');
const { Schema } = mongoose;  
const BannerSchema = new Schema({
    imagen: {type: String, required: true},
    articulos:[
        {
            idarticulo:{type: String, required:true},
            url:{type:String,required: true},
            titulo:{type: String, required:true},
            categoria:{type: String, required:true},
            idprecio:{type:String, required:true},
            cantidad:{type:Number, required:true},
            imagenes: [String],
            marca:{type: String , required:true},
            descuento:{type:Number,required:false}


        }
    ]
});
module.exports = mongoose.model('Banner', BannerSchema);
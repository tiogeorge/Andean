const mongoose = require('mongoose');
const { Schema } = mongoose;  
const BannerSchema = new Schema({
    imagen: {type: String, required: true},
    articulos:[
        {
            idarticulo:{type: String, required:true},
            titulo:{type: String, required:true},            
            imagenes: [String],

        }
    ]
});
module.exports = mongoose.model('Banner', BannerSchema);
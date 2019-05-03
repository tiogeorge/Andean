const mongoose = require('mongoose');
const { Schema } = mongoose;  
const ArticuloSchema = new Schema({
    idarticulo:{ type: String, required: true, trim: true, lowercase: true},
    titulo:{type:String, required: true},
    url:{type: String, required:true},
    categoria:{type: String, required:true},
    marca:{type: String, required: true},
    cantidad:{type: String, required:true},
    caracteristicas:{type: String, required: true},
    imagenes:[String],
    descripcion:{type: String, require: true},
    garantias:{type: String, required: true},
    equipos:[{
        idequipo:{type: String, required:true},
        descripcion:{type: String, required:true},
        cantidad:{type: Number, required: false},
        color:{type:String, required:false},
        detalle:{type: String, required:false},
        imagen:{type: String, required: false},
        codigocolor:{type: String, required: false},
        preciocompra:{type:Number, required:true},
        precioventa:{type:Number, required:true}
    }],
    palabrasclaves:{type: String, required: true},
    descuento:{type: Number, required:true},
    seodescripcion:{type: String, required: true}
});
module.exports = mongoose.model('Articulo', ArticuloSchema);
// SELECT * FROM taarticulo WHERE fnAS_StockArticulo(idArticulo) > 0

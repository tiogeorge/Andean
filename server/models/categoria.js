const mongoose = require('mongoose');
const { Schema } = mongoose;  
const CategoriaSchema = new Schema({
    id:{ type: Number, requiere: true},
    nombre:{ type: String, requiere: true},
    descripcion:{ type: String, requiere: true},
    imagen:{ type: String, requiere: true},
    padre:{ type: Number, requiere: true}
});
module.exports = mongoose.model('Categoria', CategoriaSchema);
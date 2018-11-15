const mongoose = require('mongoose');
const { Schema } = mongoose;  
const CategoriaSchema = new Schema({
    nombre:{ type: String, requiere: true},
    descripcion:{ type: String, requiere: true},
    imagen:{ type: String, requiere: true},
    padre:{ type: String, requiere: true}
});
module.exports = mongoose.model('Categoria', CategoriaSchema);
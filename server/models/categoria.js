const mongoose = require('mongoose');
const { Schema } = mongoose;  
const CategoriaSchema = new Schema({
    nombre:{ type: String, require: true},
    descripcion:{ type: String, require: true},
    imagen:{ type: String, require: true},
    padre:{ type: String, require: true}
});
module.exports = mongoose.model('Categoria', CategoriaSchema);
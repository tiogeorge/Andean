const mongoose = require('mongoose');
const { Schema } = mongoose;  
const CategoriaSchema = new Schema({
    nombre:{ type: String, required: true},
    descripcion:{ type: String, required: true},
    imagen:{ type: String, required: true},
    padre:{ type: String, required: true},
    caracteristicas:[{
        nombre : { type: String},
        medida : { type: String}
    }],
    icono:{type: String, requires: true}
});
module.exports = mongoose.model('Categoria', CategoriaSchema);
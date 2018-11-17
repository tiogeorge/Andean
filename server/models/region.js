const mongoose = require('mongoose');
const { Schema } = mongoose;  
const RegionSchema = new Schema({
    nombre: String,
    provincias: [ { nombre : String, distritos : [String] } ]
});

module.exports = mongoose.model('Region', RegionSchema);
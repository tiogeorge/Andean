const mongoose = require('mongoose');
const { Schema } = mongoose;  
const RegionSchema = new Schema({
    departamento: String,
    provincias: [ { provincia : String, distritos : [String] } ]
});

module.exports = mongoose.model('Region', RegionSchema);
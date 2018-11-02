const mongoose = require('mongoose');
const { Schema } = mongoose;

const imagenSchema = new Schema({
    idimagen:{type: String, required: true},
    dimension:{ type:String, required:true},
    data:{type: Buffer, required:true}

});
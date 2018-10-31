const mongoose = require('mongoose');
const { Schema } = mongoose;

const imagenSchema = new Schema({
    idimagen:{type: string, required: true},
    dimension:{ type:string, required:true},
    data:{type: Buffer, required:true}

});
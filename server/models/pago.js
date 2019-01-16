const mongoose= require('mongoose');
const {Schema}=mongoose;

const pagoSchema= new Schema({
    idCarrito:{type: String, required:true},
    idUsuario:{type:String,required:true},
    Articulo:[{
        idArticulo:{type: String, required:true},
        PrecioUni:{type: String, required: true},
        idPlan:{type:String, required:true},
    }],
    FechaCompra:{type:String, required:true},
    EstadoPago:{type:String, required:true},
    idDireccion:{type:String, required:true},
    idTipoPago:{type:String, required:true},
    Mensaje:{type:String},
    EstadoEnvio:{type:String, required:true},
    FechaEnvio:{type:Date,required:true},
    FechaEntrega:{type:Date,required:true},
    PrecioTotal:{type:String,required:true},
    NroTransaccion:{type:String,required:true},
    Documento:[{
        Tipo:{type: String, required:true},
        Serie:{type: String, required:true},
        Numero:{type: String, required:true},
    }],
    idVendedor:{type: String, required:true},
});

module.exports = mongoose.model('Pago',pagoSchema);
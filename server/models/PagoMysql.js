const mongoose= require('mongoose');
const {Schema}=mongoose;


const pago2schema=new Schema ({
    tipocomprobante: {type: String},
    seriecomprobante:{type: String},
    pNroComprobante:{type: String},
    pFechaVenta:{type:Date},
    pFechaRegistro:{type:Date},
    pEsVentaAlContad:{type:Number},
    pIdEmpleado:{type: String},
    pIdLocal:{type: String},
    pIdCliente:{type: String},
    pEsCancelad:{type:Number},
    pImprimirGui:{type:Number},
    pMontoPagado:{type:Number},
    pPrecioVentaTotal:{type:Number},
    pIGVTotal:{type:Number},
    pRedondeo:{type:Number},
    pIdNivelCliente:{type: String},
    pIdLineaProducto:{type: String},
    pUsarNivel:{type:Number},
    pObservacion:{type: String},
    pMontoPagadoReal:{type:Number},
  });

  module.exports = mongoose.model('Pago2',pago2schema);
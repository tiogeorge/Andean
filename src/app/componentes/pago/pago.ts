import { Articulo } from './../articulo-detalle/articulo';
export interface temarti {
    idArticulo: String,
    PrecioUni: String,
    idPlan: String,
}
export interface temdoc {
    Tipo: String,
    Serie: String,
    Numero: String,
}

export class Pago {

    constructor(_id = null, idUsuario = '', Articulo = null, FechaCompra = new Date(), EstadoPago = '', idDireccion = '', idTipoPago = '', Mensaje = '', EstadoEnvio = '', FechaEnvio = new Date(), FechaEntrega = new Date(), PrecioTotal = '', NroTransaccion = '', Documento = null, idVendedor = '') {
        this._id = _id;
        this.idUsuario = idUsuario;
        this.Articulo = Articulo;
        this.FechaCompra = FechaCompra;
        this.EstadoPago = EstadoPago;
        this.idDireccion = idDireccion;
        this.idTipoPago = idTipoPago;
        this.Mensaje = Mensaje;
        this.EstadoEnvio = EstadoEnvio;
        this.FechaEnvio = FechaEnvio;
        this.FechaEntrega = FechaEntrega;
        this.PrecioTotal = PrecioTotal;
        this.NroTransaccion = NroTransaccion;
        this.Documento = Documento;
        this.idVendedor = idVendedor;
    }
    _id: string;
    idCarrito: string;
    idUsuario: string;
    Articulo: temarti[];
   // Articulo:string;
    FechaCompra: Date;
    EstadoPago: string;
    idDireccion: string;
    idTipoPago: string;
    Mensaje: string;
    EstadoEnvio: string;
    FechaEnvio: Date;
    FechaEntrega: Date;
    PrecioTotal: string;
    NroTransaccion: string;
    Documento: temdoc[];
    idVendedor: string;
}

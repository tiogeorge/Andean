import { Articulo } from './../articulo-detalle/articulo';
export interface temarti {
    _id:String,
    idarticulo: String,
    titulo: String,
    url: String,
    categoria: String,
    marca: String,
    cantidad: String,
    cuotainicial: String,
    cuotamensual: String,
    cuotas: String,
    montomes: String,
    nombreplan: String,
    precio: String,
    tipolinea: String,
    tipoplan: String,
}
export interface temdoc {
    Tipo: String,
    Serie: String,
    Numero: String,
}

export class Pago {

    constructor(_id = null, idUsuario = '',Correocliente='', Articulo = null, FechaCompra = new Date(), EstadoPago = '', idDireccion = '', idTipoPago = '', Mensaje = '', EstadoEnvio = '', FechaEnvio = new Date(), FechaEntrega = new Date(), PrecioTotal = '', NroTransaccion = '', Documento = null, idVendedor = '') {
        this._id = _id;
        this.idUsuario = idUsuario;
        this.Correocliente=Correocliente;
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
    idUsuario: string;
    Correocliente:string;
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

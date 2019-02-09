export class Valoracion {
    constructor(idarticulo='' ,cliente = '' , nombrecliente = '', comentario = ''  , puntuacion =  0 , fecha = new Date()){
        this.idarticulo = idarticulo;
        this.cliente = cliente;
        this.nombrecliente = nombrecliente;
        this.comentario = comentario;
        this.puntuacion = puntuacion;
        this.fecha = fecha;
    }
    idarticulo : string;
    cliente: string;
    nombrecliente : string;
    comentario: string;
    puntuacion: Number;
    fecha:Date;
  }
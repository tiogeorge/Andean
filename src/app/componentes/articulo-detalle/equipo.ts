export class Equipo{
    constructor(idequipo='', descripcion='', cantidad=0,color='',detalle='',imagen='', preciocompra=0, precioventa=0){
        this.idequipo = idequipo;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.color = color;
        this.detalle = detalle;
        this.imagen = imagen;
        this.preciocompra = preciocompra;
        this.precioventa = precioventa;
    }
    idequipo: string;
    descripcion: string;
    cantidad: number;
    color: string;
    detalle: string;
    imagen: string;
    codigocolor: string;
    preciocompra: number;
    precioventa: number;
}
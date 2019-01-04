export class Caracteristica{
    constructor(_id='', nombre='', valor=''){
        this._id = _id;
        this.nombre = nombre;
        this.valor = valor;
    }
    _id: string;
    nombre: string;
    valor: string;
}
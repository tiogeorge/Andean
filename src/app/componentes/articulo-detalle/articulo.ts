import { Caracteristica} from './caracteristica'
export class Articulo {

    constructor( _id=null ,idarticulo = '', titulo = '',url='', categoria = '',marca='',cantidad=0, idprecio = '', especaficaciones = [], caracteristicas= [], imagenes=[], descripcion='', garantias=[]) {
        this._id=_id;
        this.idarticulo = idarticulo;
        this.titulo = titulo;
        this.url = url;
        this.categoria = categoria;
        this.idprecio = idprecio;
        this.especificaciones= especaficaciones;
        this.caracteristicas = caracteristicas;
        this.imagenes = imagenes;
        this.descripcion = descripcion;
        this.garantias = garantias;
    }
  
    _id: string;
    idarticulo: string;
    titulo: string;
    url: string;
    categoria: string;
    marca: string;
    cantidad: Number;
    idprecio: string;
    especificaciones: string[];
    caracteristicas:Caracteristica[];
    imagenes: string[];
    descripcion: string;
    garantias: string[];
    calificaciones: any;
  }
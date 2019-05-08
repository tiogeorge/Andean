import { Caracteristica} from './caracteristica'
import { Equipo }  from './equipo';
export class Articulo {

    constructor( _id=null ,idarticulo = '', titulo = '',url='', categoria = '',marca='',cantidad=0, idprecio = '', especaficaciones = [], caracteristicas= '', imagenes=[], descripcion='', garantias='', equipos=[], palabrasclaves='', descuento = 0) {
        this._id=_id;
        this.idarticulo = idarticulo;
        this.titulo = titulo;
        this.url = url;
        this.categoria = categoria;
        this.especificaciones= especaficaciones;
        this.caracteristicas = caracteristicas;
        this.imagenes = imagenes;
        this.descripcion = descripcion;
        this.garantias = garantias;
        this.equipos= equipos;
        this.palabrasclaves= palabrasclaves;
        this.descuento = descuento;
    }
  
    _id: string;
    idarticulo: string;
    titulo: string;
    url: string;
    categoria: string;
    marca: string;
    cantidad: Number;
    especificaciones: string[];
    caracteristicas:string;
    imagenes: string[];
    descripcion: string;
    garantias: string;
    equipos: Equipo[];
    palabrasclaves: string;
    descuento: Number;
  }
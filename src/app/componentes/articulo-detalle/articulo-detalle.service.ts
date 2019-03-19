import { Constantes } from './../constantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulo } from './articulo';
import { Categoria } from '../categoria/categoria';

@Injectable({
  providedIn: 'root'
})
export class ArticuloDetalleService {
  http: HttpClient;
  Articulo: Articulo[];
  articuloSeleccionado: Articulo = new Articulo();
  url_imagenes = Constantes.URL_IMAGEN;
  url_imagenes_md = Constantes.URL_IMAGEN_MD;
  url_imagenes_sm = Constantes.URL_IMAGEN_SM;
  categoria : Categoria;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getArticulo(idarticulo: string) {
    return this.http.get(Constantes.URL_API_ARTICULO + '/url/' + idarticulo, {withCredentials: true});
  }

  getCarrito(){
    return this.http.get(Constantes.URL_API_USUARIO + '/carrito', {withCredentials: true});
  }

  getPreciosArticulo(nombreequipo: string,linea:string,tipoplan:string,cuotas:string){
    return this.http.get(Constantes.URL_API_PLANES +'/planesequipo/'+nombreequipo +'/'+linea+'/'+tipoplan+'/'+cuotas, {withCredentials: true});
  }
  getDetallePlan(nombre: string){
    return this.http.get(Constantes.URL_API_PLANES+"/plan/"+nombre, {withCredentials: true});
  }

  listarArticulos(palabraclave:string,linea:string,tipo:string,cuota:string) {
     //return this.http.get(Constantes.URL_API_ARTICULO+`/mongo/`);
    return this.http.get(Constantes.URL_API_ARTICULO + `/mn/` + palabraclave+'/'+linea+'/'+tipo+'/'+cuota, {withCredentials: true})
  }
  listarArticulos2(palabraclave:string,linea:string,tipo:string,cuota:string) {
    //return this.http.get(Constantes.URL_API_ARTICULO+`/mongo/`);
   return this.http.get(Constantes.URL_API_ARTICULO + `/marcaart/` + palabraclave+'/'+linea+'/'+tipo+'/'+cuota, {withCredentials: true})
 }
 listarArticulo3(palabraclave:string,linea:string,tipo:string,cuota:string){
   return this.http.get(Constantes.URL_API_ARTICULO + `/categoriaart/`+ palabraclave+'/'+linea+'/'+tipo+'/'+cuota, {withCredentials: true})
 }
 listarArticulo4(categoriapadre:string,linea:string,tipo:string,cuota:string){
  return this.http.get(Constantes.URL_API_ARTICULO + `/bus/`+ categoriapadre+'/'+linea+'/'+tipo+'/'+cuota, {withCredentials: true})
}

  getArticulosBanner(idbanner: string){
    return this.http.get(Constantes.URL_API_ARTICULO+`/banners/banner/`+idbanner+`/PREPAGO/ALTA/0`, {withCredentials: true});
  }

}

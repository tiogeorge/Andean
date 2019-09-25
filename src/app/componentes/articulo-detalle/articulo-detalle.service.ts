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

  listarArticulos(palabraclave:string, page : any) {
     //return this.http.get(Constantes.URL_API_ARTICULO+`/mongo/`);
    return this.http.get(Constantes.URL_API_ARTICULO + `/mn/` + palabraclave+`/`+page, {withCredentials: true})
  }
  listarArticulos2(palabraclave:string, page: any) {
    //return this.http.get(Constantes.URL_API_ARTICULO+`/mongo/`);
   return this.http.get(Constantes.URL_API_ARTICULO + `/marcaart/` + palabraclave+`/`+page, {withCredentials: true})
 }
 listarArticulo3(palabraclave:string, page: any){
   return this.http.get(Constantes.URL_API_ARTICULO + `/categoriaart/`+ palabraclave+`/`+page, {withCredentials: true})
 }
 listarArticulo4(categoriapadre:string, page: any){
  return this.http.get(Constantes.URL_API_ARTICULO + `/bus/`+ categoriapadre+`/`+page, {withCredentials: true})
}

  getArticulosBanner(idbanner: string, page: any){
    return this.http.get(Constantes.URL_API_ARTICULO+`/banners/banner/`+idbanner+`/`+page, {withCredentials: true});
  }

}

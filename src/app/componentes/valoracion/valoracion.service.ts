import { Valoracion } from './valoracion';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  http: HttpClient;
  valoraciones: Valoracion[];
  valoracionCliente: Valoracion;
  valoracionSinCliente: Valoracion[];
  constructor(http:HttpClient) {
    this.http=http;
   }

   /*
   obtenerValoracionesTotales(){
    return this.http.get(Constantes.URL_API_VALORACION);
   }
   */
   obtenerValoracionesArticulo(idarticulo:string){
     return this.http.get(Constantes.URL_API_VALORACION +"/"+idarticulo,{withCredentials: true});
   }
   obtenerValoracionCliente(idarticulo:string, cliente:string){
    return this.http.get(Constantes.URL_API_VALORACION+"/"+idarticulo+"/"+ cliente,{withCredentials: true});
   }
   obtenerValoracionesSinCliente(idarticulo:string, cliente:string){
     return this.http.get(Constantes.URL_API_VALORACION+"/"+idarticulo+"/"+ cliente +"/sin", {withCredentials: true});
   }

   crearValoracion(valoracion: Valoracion){
    return this.http.post(Constantes.URL_API_VALORACION, valoracion, {withCredentials: true});
   };
  
   editarValoracion(valoracion: Valoracion){
    return this.http.post(Constantes.URL_API_VALORACION, valoracion, {withCredentials: true});
   };

}
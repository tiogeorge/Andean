import { Marca } from './marca';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../constantes';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  http: HttpClient;
  selecmarca:Marca;
  marca:Marca[];
  urlmarca=Constantes.URL_API_MARCA
  constructor(http:HttpClient) {
    this.http=http;
   }
   obtenerMarcas(){
    return this.http.get(Constantes.URL_API_MARCA+"/mdb",{withCredentials: true});
  }

   obtenerMarca(id:string){
     return this.http.get(Constantes.URL_API_MARCA+"/mdb/"+id,{withCredentials: true});
   }
   listarMarcas(id:string){
    return this.http.get(Constantes.URL_API_MARCA+`/marc/` + id, {withCredentials: true});
   }
   listarmarcasT(){
     return this.http.get(Constantes.URL_API_MARCA+`/mdb`, {withCredentials: true});
   }
}

import { Constantes } from '../constantes';
import { Direccion} from './direccion';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  selecDireccion:Direccion;
  direccion:Direccion[];
  readonly URL_API =  Constantes.URL_API_DIRECCION;

  constructor(private http: HttpClient) {
    this.selecDireccion=new Direccion();
   }

   AgregarDireccion(Direccion:Direccion){
     return this.http.post(this.URL_API,Direccion, {withCredentials: true});
   }
   
   ListarDireccion(_id:string){
     return this.http.get(this.URL_API +  `/${_id}`, {withCredentials: true});
   }
   EliminarDireccion(_id:string){
     return this.http.delete(this.URL_API +  `/${_id}`, {withCredentials: true});
   }
   
   Listardireccionuni(_id:string){
     return this.http.get(this.URL_API+  `/uni/${_id}`, {withCredentials: true});
   }

   actualizarDireccion(direccion: Direccion){
    return this.http.put(this.URL_API + `/${direccion._id}`, direccion, {withCredentials: true})
  }

}

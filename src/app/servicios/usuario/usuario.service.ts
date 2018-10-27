import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http' 

import { Usuario } from '../../modelos/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  usuarioSeleccionado: Usuario;
  usuarios: Usuario[];

  readonly URL_API = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { 
    this.usuarioSeleccionado = new Usuario();
  }
  
  post(usuario: Usuario){
    return this.http.post(this.URL_API, usuario);
  }

  get(){
    return this.http.get(this.URL_API);
  }

  put(usuario: Usuario){
    return this.http.put(this.URL_API + `/${usuario._id}`,usuario);
  }

  delete(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}

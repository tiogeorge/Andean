import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { Usuario } from '../../modelos/usuario';
import 'rxjs/add/operator/map';

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
  
  registrarUsuario(usuario: Usuario){
    return this.http.post(this.URL_API, usuario);
  }

  validarUsuario(usuario: Usuario){
    if(usuario.apellidos == undefined || usuario.nombres == undefined
      || usuario.contrasena == undefined || usuario.correo == undefined){
        return false;
      } else {
        return true;
      }
  }

  login(usuario: Usuario){
    return this.http.post(this.URL_API + '/login',usuario);
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

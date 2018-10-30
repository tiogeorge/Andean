import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
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

}

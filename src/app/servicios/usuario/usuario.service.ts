import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private estaLogeado : boolean;
  public usuarioLogeado: Usuario;
  usuarioSeleccionado: Usuario;
  usuarios: Usuario[];

  readonly URL_API = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { 
    this.estaLogeado = false;
    this.usuarioSeleccionado = new Usuario();
  }
  
  registrarUsuario(usuario: Usuario){
    return this.http.post(this.URL_API, usuario);
  }

  validarUsuario(usuario: Usuario){
    if(usuario.apellidos == "" || usuario.nombres == ""
      || usuario.password == "" || usuario.correo == ""){
        return false;
      } else {
        return true;
      }
  }

  login(usuario: Usuario){
    return this.http.post(this.URL_API + '/login',usuario);
  }

  setUsuarioLogeado(usuario: Usuario){
    this.estaLogeado = true;
    this.usuarioLogeado = usuario;
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  }

  getUsuarioLogeado() {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';
import { catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public estaLogeado : boolean;
  public usuarioLogeado: Usuario;
  public usuarioSeleccionado: Usuario;
  public usuarios: Usuario[];
  readonly URL_API = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { 
    this.estaLogeado = false;
    this.usuarioSeleccionado = new Usuario();
  }
  
  registrarUsuario(usuario: Usuario){
    return this.http.post(this.URL_API, usuario);
  }

  validarUsuario(usuario: Usuario){
    if(usuario.apellidos == "" || usuario.nombres == "" || usuario.password == "" || usuario.correo == ""){
        return false;
      } else {
        return true;
      }
  }

  login(usuario: Usuario){
    return this.http.post(this.URL_API + '/login',usuario);
  }

  getUsuarioLogeado(token: string) {
  	return this.http.get(this.URL_API + '/' + token);
  }

  putUsuario(usuario: Usuario) {
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario).pipe(
      catchError(this.handleError<any>('putUsuario'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

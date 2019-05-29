import { Constantes } from '../constantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';
import { catchError} from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  public usuarioSeleccionado: Usuario;
  public usuarios: Usuario[];
  readonly URL_API = Constantes.URL_API_USUARIO;
  readonly URL_API_SESSION = Constantes.URL_API_SESION;

  constructor(public http: HttpClient) { 
    this.usuarioSeleccionado = new Usuario();
  }

  /**
   * Método que agrega un artículo en el carrito de compras
   * @param urlArticulo : identificador de un artículo
   * @param plan : plan seleccionado del artículo
   */
  agregarArticuloCarrito(idArticulo: string, idequipo:string, cantidad: number, imagen: string){
    const articulo = {
      id: idArticulo,
      idequipo: idequipo,
      cantidad: cantidad,
      imagen: imagen
      
    };
    return this.http.put(this.URL_API + `/carrito/${idArticulo}`, articulo,{withCredentials: true}).pipe(
      catchError(this.handleError<any>('agregartArticulo'))
    );
  }

  /**
   * Método para eliminar un artículo del carrito de compras
   * @param urlArticulo : identificador del artículo
   */
  eliminarArticuloCarrito(urlArticulo: string) {
    return this.http.delete(this.URL_API + `/carrito/${urlArticulo}`, { withCredentials: true }).pipe(
      catchError(this.handleError<any>('eliminarArticulo'))
    );
  }

  /**
   * Método que elimina todos los artículos de un carrito de compras
   */
  eliminarArticulosCarrito(){
    return this.http.delete(this.URL_API + `/carrito`, { withCredentials: true }).pipe(
      catchError(this.handleError<any>('eliminarArticulos'))
    );
  }

  /**
   * Método que devuelve los datos de un usuario que ha iniciado sesión
   */
  getUsuarioLogeado() {
  	return this.http.get(this.URL_API + '/cliente' , { withCredentials: true });
  }

  /**
   * Método que guarda el costo de envío en la sesión del cliente
   * @param envio : JSON que contiene el costo de envío
   */
  guardarCostoEnvio(envio: any){
    return this.http.post(this.URL_API + '/envio', envio, {withCredentials: true});
  }
  
  /**
   * Método que verifica el cliente y su contraseña para ingresar a su cuenta
   * @param usuario : datos del cliente para iniciar sesión
   */
  login(usuario: Usuario){
    return this.http.post(this.URL_API + '/login',usuario,{ withCredentials: true });
  }

  logueado(){
    return !!localStorage.getItem("session_token");
  }
  existeToken(){
    return !!localStorage.getItem("pt");
  }
  getToken(){
    if(localStorage.getItem('session_token')){
      return localStorage.getItem('session_token');
    }else{
      return localStorage.getItem('pt');
    }
  }
  esTokenPublicoVigente(){
    return moment().isBefore(this.getExpiration());
  }
  esRefreshTokenVigente(){
    return moment().isBefore(this.getExpirationRefreshToken());
  }
  getExpirationRefreshToken() {
    const expiration = localStorage.getItem("refresh_token_exp");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  esSessionTokenVigente(){
    return moment().isBefore(this.getExpirationSessionToken());
  }
  getExpirationSessionToken() {
    const expiration = localStorage.getItem("session_token_exp");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  getExpiration() {
    const expiration = localStorage.getItem("expires_pt");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  async getPublicToken(){
    const res = await  this.http.post(this.URL_API_SESSION+'/gt', { withCredentials : true }).toPromise();

    return res;
  }
  async getNewSessionToken(){
    const res = await  this.http.post(this.URL_API_SESSION+'/newsessiontoken', {refresh_token: localStorage.getItem('refresh_token')},{ withCredentials : true }).toPromise();
    return res;
  }
  async obtenerNuevoToken(){
    const res = await this.http.post(this.URL_API_SESSION+'/newsessiontoken', {refresh_token: localStorage.getItem('refresh_token')},{ withCredentials : true }).toPromise();
    return res;
  }
  logout(){
    localStorage.removeItem('session_token');
    localStorage.removeItem('session_token_exp');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('refresh_token_exp');
  }
  /**
   * Método que actualiza la información de un cliente
   * @param usuario 
   */
  putUsuario(usuario: Usuario) {
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario, { withCredentials: true }).pipe(
      catchError(this.handleError<any>('putUsuario'))
    );
  }

  /**
   * Método que guarda los datos de un usuario nuevo en la base de datos
   * @param usuario 
   */
  registrarUsuario(usuario: Usuario){
    return this.http.post(this.URL_API, usuario, { withCredentials : true });
  }

  /**
   * Valida los datos del formulario de registro
   * @param usuario : datos del nuevo cliente
   */
  validarUsuario(usuario: Usuario){
    if(usuario.apellidos == "" || usuario.nombres == "" || usuario.password == "" || usuario.correo == ""){
      return false;
    } else {
      return true;
    }
  }

  /**
   * Método que maneja los errores en los observables
   * @param operation : operación en la que ocurre el error
   * @param result 
   */
  private handleError<T> (operation = 'operation', result?: T){

    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

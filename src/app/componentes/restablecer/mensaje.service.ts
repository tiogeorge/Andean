import { Constantes } from '../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(public http: HttpClient) { }

  /**
   * Método para enviar mensaje a un correo electrónico
   * @param mensaje : información sobre el mensaje
   */
  enviarMensaje(mensaje: any){
    return this.http.post(Constantes.URL_API_USUARIO + '/recuperar', mensaje, {withCredentials: true});
  }

  /**
   * Método para cambiar la contraseña de un cliente
   * @param contraseña : la nueva contraseña a cambiar
   */
  cambiarPassword(contraseña: any){
    return this.http.put(Constantes.URL_API_USUARIO + '/cambiar', contraseña, {withCredentials: true});
  }
}

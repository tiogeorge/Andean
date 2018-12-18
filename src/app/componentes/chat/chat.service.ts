import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Usuario } from '../perfil-usuario/usuario';
import { Constantes } from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket  = io(Constantes.URL_API);
  usuario: Usuario= new Usuario();
  constructor() { 

  }
  enviarMensaje(idchat: string, data){
    this.socket.emit(idchat,data);
  }

  nuevoMensaje(){
    let observable = new Observable(observer => {
      console.log("desde observable"+this.usuario.correo);
      this.socket.on(this.usuario.correo, (data) => {
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
   });
   return observable;
  }
}

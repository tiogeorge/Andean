import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Usuario } from '../perfil-usuario/usuario';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket  = io('http://localhost:3000');
  usuario: Usuario= new Usuario();
  constructor() { 

  }
  enviarMensaje(idchat: string, data){
    this.socket.emit(idchat,data);
  }

  nuevoMensaje(){
    let observable = new Observable(observer => {
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

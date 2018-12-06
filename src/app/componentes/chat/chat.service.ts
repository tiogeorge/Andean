import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket  = io('http://localhost:3000');
  constructor() { 

  }
  enviarMensaje(data: string){
    this.socket.emit('chat:mensaje',data);
  }

  nuevoMensaje(){
    let observable = new Observable(observer => {
      this.socket.on('chat:mensaje', (data) => {
        console.log("Recibido mensaje del server");
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
   });
   return observable;
  }
}

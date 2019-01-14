import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Usuario } from '../perfil-usuario/usuario';
import { Constantes } from '../constantes';
import { HttpClient } from '@angular/common/http';
import { MensajeChat } from './mensaje-chat';

export class Conversacion {
  _id             : string;
  nombreCliente   : string;
  email           : string;
  tipoConsulta    : string;
  consulta        : string;
  createdAt       : Date;
  concluido       : boolean;
  unir            : boolean = false;
  
  constructor(_id= '', nombreCliente = '', email = '', tipoConsulta = '', consulta = ''){
    this._id = _id;
    this.nombreCliente = nombreCliente;
    this.email = email;
    this.tipoConsulta = tipoConsulta;
    this.consulta = consulta;
  }
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  public socket             = io(Constantes.URL);
  usuario         : Usuario = new Usuario();
  conversacionId  : string;
  
  constructor(public http: HttpClient) { 
  }

  iniciarConversacion(idchat: string, data: Usuario, tipoConsulta: string, consulta: string){
    const conversacion = new Conversacion('',data.nombres, data.correo, tipoConsulta, consulta);
    this.http.post(Constantes.URL_API_CHAT, conversacion, {withCredentials: true}).subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.status)
        this.socket.emit(idchat, jres.data as Conversacion);
        //console.log(jres);
        this.conversacionId = jres.data._id;
    });
  }

  enviarMensaje(idchat: string, data: MensajeChat) {
    this.http.post(Constantes.URL_API_CHAT + '/' + data.conversacionId, data, {withCredentials: true}).subscribe( res =>{
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){
        this.socket.emit(idchat, data);
      }
    });
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

  cerrarConversacion(data: MensajeChat){
    this.socket.emit('desconectar', data);
  }

}

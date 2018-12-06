import { Component, OnInit } from '@angular/core';
import { ChatService} from './chat.service'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensajeserver: String = "";

  constructor(private chatService: ChatService ) { }

  ngOnInit() {
    this.chatService.enviarMensaje("Saludos DESDE EL CLIENTE");

    this.chatService.nuevoMensaje()
    .subscribe(res=>{
      this.mensajeserver = res as String;
    });
  }

  mostrarChat(){
    console.log("mostando chat");
    document.getElementById("btnchat").hidden=true;
    document.getElementById("ventana-chat").hidden=false;
  }
  cerrarChat(){
    document.getElementById("btnchat").hidden=false;
    document.getElementById("ventana-chat").hidden=true;

  }

}

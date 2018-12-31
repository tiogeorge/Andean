import { Component, OnInit } from '@angular/core';
import { ChatService} from './chat.service'
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { Usuario } from '../perfil-usuario/usuario';
import { MensajeChat } from './mensaje-chat';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensajeserver: String = "";
  usuario : Usuario = new Usuario();
  mensajeusuario: string = "";
  contentPrinted = false;


  listaMensajesChat: MensajeChat[] = new Array();
  ultimomensaje: MensajeChat= new MensajeChat();

  constructor(private chatService: ChatService,
              private usuarioService: UsuarioService ) { }

  ngOnInit() {    
    this.verificarUsuario();
  }
 
  verificarUsuario(){
    this.usuarioService.getUsuarioLogeado().subscribe( res => {
      var respuesta = JSON.parse(JSON.stringify(res));
      if(respuesta.status){
        this.chatService.usuario = respuesta.data as Usuario;      
        document.getElementById("input-nombre").hidden = true;
        document.getElementById("input-email").hidden = true;
        document.getElementById("mensaje-formulario-chat").innerHTML = "Bienvenido "+this.chatService.usuario.nombres+ ", porfavor ingrese los datos solicitados para ayudarle.";
        //this.iniciarChat();
        this.chatService.nuevoMensaje().subscribe( res => {
          var mensaje = res as MensajeChat;
          this.agregarMensaje(mensaje);
        });
      }else {
        document.getElementById("mensaje-formulario-chat").innerHTML = " Porfavor ingrese la siguiente informacion para poder ayudarle: "
        document.getElementById("input-nombre").hidden = false;
        document.getElementById("input-email").hidden = false;
      }   
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

  iniciarChat(){
    this.chatService.enviarMensaje("init-chat",this.chatService.usuario);
    document.getElementById("footer-enviar-mensaje").hidden = false;
    document.getElementById("footer-iniciar-chat").hidden = true;
    document.getElementById("chat-principal").hidden = false;
    document.getElementById("formulario-chat").hidden = true;
    
  }
  mostrarChatPrincipal(res){
    if(res.estado == 1){
      console.log(res.mensaje);
      document.getElementById("footer-enviar-mensaje").hidden = false;
      document.getElementById("footer-iniciar-chat").hidden = true;
      document.getElementById("chat-principal").hidden = false;
      document.getElementById("formulario-chat").hidden = true;

    }

  }
  cambioselect(){
    console.log("cambio select");
  }
  enviarMensajeChat(event){
    if(event.key== "Enter"){
      var input = document.getElementById("mensajechat") as HTMLInputElement;
      let valor = input.value;
      if(valor!=""){
        var  mensaje = new MensajeChat(this.chatService.usuario.correo,"admin",valor,"","");
        this.chatService.enviarMensaje("chat-admin", mensaje);
        input.value = "";
        mensaje.usuario = this.chatService.usuario.nombres;
        this.agregarMensaje(mensaje);
      }
      
    }

  }

  agregarMensaje(m: MensajeChat){ 
    this.listaMensajesChat.push(m);
  }
  MoverScroll() {
    //console.log("termino de renderizar los mensajes ....");
    var contenedorchat = document.getElementById("chat-principal") as HTMLDivElement;
    contenedorchat.scrollTop =contenedorchat.scrollHeight;
  }

}

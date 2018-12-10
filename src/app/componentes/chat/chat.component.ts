import { Component, OnInit } from '@angular/core';
import { ChatService} from './chat.service'
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { Usuario } from '../perfil-usuario/usuario';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensajeserver: String = "";
  usuario : Usuario = new Usuario();
  mensajeusuario: string = "";

  constructor(private chatService: ChatService,
              private usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.chatService.enviarMensaje("chat:mensaje","Saludos DESDE EL CLIENTE");    
    
    this.verificarUsuario();
  }
  verificarUsuario(){
    if(localStorage.getItem("_tk")){
      this.usuarioService.getUsuarioLogeado(localStorage.getItem("_tk"))
      .subscribe(res=>{
        var respuesta = JSON.parse(JSON.stringify(res));
        console.log(respuesta);
        this.chatService.usuario = respuesta.data as Usuario;      
        document.getElementById("input-nombre").hidden = true;
        document.getElementById("input-email").hidden = true;
        document.getElementById("mensaje-formulario-chat").innerHTML = "Bienvenido "+this.chatService.usuario.nombres+ ", porfavor ingrese los datos solicitados para ayudarle."
        this.chatService.nuevoMensaje()
        .subscribe(res=>{
          var respuesta  = JSON.parse(JSON.stringify(res));          
          this.mostrarChatPrincipal(respuesta);
        });
      });
     }else{
      document.getElementById("mensaje-formulario-chat").innerHTML = " Porfavor ingrese la siguiente informacion para poder ayudarle: "
      document.getElementById("input-nombre").hidden = false;
      document.getElementById("input-email").hidden = false;
    }

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
    this.chatService.enviarMensaje("init-chat",{
      usuario:this.chatService.usuario.nombres,
      email: this.chatService.usuario.correo
    });
    

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
      this.chatService.enviarMensaje("chat:admin",valor);
      input.value = "";
      
    }

  }

}

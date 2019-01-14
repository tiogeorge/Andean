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

  mensajeserver     : String        = "";
  usuario           : Usuario       = new Usuario();
  mensajeusuario    : string        = "";
  contentPrinted    : boolean       = false;
  listaMensajesChat : MensajeChat[] = new Array();
  ultimomensaje     : MensajeChat   = new MensajeChat();
  mostrarBotonChat  : boolean       = true;
  mostrarCampos     : boolean       = true;
  mensajeFormulario : string        = '';
  mostrarFooter     : boolean       = true;
  mostrarFormulario : boolean       = true;
  conversacionId    : string;
  habilitarEnvio    : boolean       = false;
  nombreAsesor      : string;
  idUsuario         : string;

  constructor(public chatService: ChatService,
              public usuarioService: UsuarioService ) { }

  ngOnInit() {    
  }
 
  verificarUsuario(){
    this.usuarioService.getUsuarioLogeado().subscribe( res => {
      var respuesta = JSON.parse(JSON.stringify(res));
      if(respuesta.status){
        this.chatService.usuario = respuesta.data as Usuario;      
        this.mostrarCampos = false;
        this.mensajeFormulario = "Bienvenido "+this.chatService.usuario.nombres+ ", porfavor ingrese los datos solicitados para ayudarle.";
      }else {
        this.chatService.usuario = new Usuario();
        this.mensajeFormulario = " Porfavor ingrese la siguiente informacion para poder ayudarle: ";
        this.mostrarCampos = true;
      }   
    });
  }

  mostrarChat(){
    this.verificarUsuario();
    this.mostrarBotonChat = false;
  }

  cerrarChat(){
    this.listaMensajesChat = [];
    this.mostrarBotonChat = true;
    this.mostrarFooter = true;
    this.mostrarFormulario = true;
    var mensaje = new MensajeChat(this.chatService.conversacionId, '$desconectar$', this.chatService.usuario.correo, 'admin')
    this.chatService.cerrarConversacion(mensaje);
  }

  iniciarChat(tipoConsulta: string, consulta: string){
    const esperaChat = new MensajeChat('', 'Esperando a nuestr@ asesor@ de ventas', '$unirChat','');
    this.agregarMensaje(esperaChat);
    this.chatService.nuevoMensaje().subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.autor == '$unirChat'){
        this.nombreAsesor = jres.cuerpo.split(' ')[0];
        this.habilitarEnvio = true;
      } 
      var mensaje = res as MensajeChat;
      this.agregarMensaje(mensaje);
    });
    this.chatService.iniciarConversacion('init-chat', this.chatService.usuario, tipoConsulta, consulta);
    this.mostrarFooter = false;
    this.mostrarFormulario = false;
  }
  
  iniciarConversacion(){
    this.habilitarEnvio = true;
  };

  mostrarChatPrincipal(res){
    if(res.estado == 1){
      this.mostrarFooter = false;
      this.mostrarFormulario = false;
    }
  }

  enviarMensajeChat(event, inputMensaje : HTMLInputElement){
    if(event.key== "Enter"){
      let valor = inputMensaje.value;
      if(valor != ''){
        var  mensaje = new MensajeChat(this.chatService.conversacionId, valor,this.chatService.usuario.correo, "admin");
        this.chatService.enviarMensaje("chat-admin", mensaje);
        inputMensaje.value = "";
        mensaje.autor = this.chatService.usuario.nombres;
        this.agregarMensaje(mensaje);
      }
    }
  }

  agregarMensaje(m: MensajeChat) { 
    this.listaMensajesChat.push(m);
  }

  MoverScroll(chatPrincipal : HTMLDivElement) {
    chatPrincipal.scrollTop = chatPrincipal.scrollHeight;
  }

  minimizar(){
    this.mostrarBotonChat = true;
  }
}

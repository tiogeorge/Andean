import { Component, OnInit } from '@angular/core';
import { ChatService} from '../chat/chat.service'
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { Usuario } from '../perfil-usuario/usuario';
import { MensajeChat } from '../chat/mensaje-chat';
import { comunicacionService } from '../comunicacion.service';
import { Subscription } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-chatmovil',
  templateUrl: './chatmovil.component.html',
  styleUrls: ['./chatmovil.component.css']
})
export class ChatmovilComponent implements OnInit {

  mensajeserver     : String        = "";
  usuario           : Usuario       = new Usuario();
  mensajeusuario    : string        = "";
  contentPrinted    : boolean       = false;
  listaMensajesChat : MensajeChat[] = new Array();
  ultimomensaje     : MensajeChat   = new MensajeChat();
  mostrarBotonChat  : boolean       = true;
  mostrarCampos     : boolean       = true;
  mensajeFormulariomovil : string        = " Por favor ingrese la siguiente información para poder ayudarle: ";;
  mostrarFooter     : boolean       = true;
  mostrarFormulario : boolean       = true;
  conversacionId    : string;
  habilitarEnvio    : boolean       = false;
  nombreAsesor      : string;
  idUsuario         : string;
  tiempo            : number;
  subscription: Subscription;

  constructor(public chatService: ChatService,
              public usuarioService: UsuarioService, 
              public comService: comunicacionService ) { 
  }

  ngOnInit() {
    this.verificarUsuario();
    //$(window).on("resize", this.resize);
    
  }
  ngAfterViewInit() {
    this.resize();
  }
 
  resize(){
    document.getElementById("contenedor-principal-chat-movil").style.height = (window.innerHeight)+"px";
  }
  /**
   * Método que verifica si el usuario ya ha iniciado sesión y muestra un mensaje con su nombre para pedir su consulta.
   */
  verificarUsuario(){
    this.usuarioService.getUsuarioLogeado().subscribe( res => {
      var respuesta = JSON.parse(JSON.stringify(res));
      if(respuesta.status){
        this.chatService.usuario = respuesta.data as Usuario;      
        this.mostrarCampos = false;
        this.mensajeFormulariomovil = "Bienvenido "+this.chatService.usuario.nombres+ ", especifica tu consulta para ayudarte";
      }else {
        this.chatService.usuario = new Usuario();
        this.mensajeFormulariomovil = " Por favor especifique su consulta para ayudarle: ";
        this.mostrarCampos = true;
      }   
    });
  }

 

  /**
   * Método que termina una conversación de chat
   */
  cerrarChat(){
    this.listaMensajesChat = [];
    this.mostrarFooter = true;
    this.mostrarFormulario = true;
    var mensaje = new MensajeChat(this.chatService.conversacionId, '$desconectar$', this.chatService.usuario.correo, 'admin')
    this.chatService.cerrarConversacion(mensaje);
  }

  /**
   * Método para iniciar una conversación de chat 
   * @param tipoConsulta : tipo de consulta enviada
   * @param consulta : detalles de la consulta del cliente
   */
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
  
  /**
   * Método para iniciar una conversación
   */
  iniciarConversacion(){
    this.habilitarEnvio = true;
  };

  /**
   * Método para enviar un mensaje dentro de una conversación
   * @param event : evento de presionar una tecla
   * @param inputMensaje : mensaje que el usuario ingresó
   */
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

  /**
   * Método para agregar un mensaje a el componente y así visualizarlo
   * @param m : Mensaje a visualizar
   */
  agregarMensaje(m: MensajeChat) { 
    this.tiempo = Date.now();
    m.tiempo = this.tiempo;
    this.listaMensajesChat.push(m);
  }

  /**
   * Método que ubica los mensajes al final del componente
   * @param chatPrincipal : Elemento DOM del chat
   */
  MoverScroll(chatPrincipal : HTMLDivElement) {
    chatPrincipal.scrollTop = chatPrincipal.scrollHeight;
  }

  

}

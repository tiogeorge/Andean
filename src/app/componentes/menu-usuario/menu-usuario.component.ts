import { Component, OnInit, HostListener } from '@angular/core';
import { comunicacionService } from '../comunicacion.service';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})

export class MenuUsuarioComponent implements OnInit {
  subscription: Subscription;
  usuario:any = null;
  constructor( public usuarioService : UsuarioService, public comService: comunicacionService, public router:Router) {
    this.subscription = this.comService.getUsuario()
    .subscribe(user => {
      if(user != null){
        this.usuario =user;   
      }else{
        //NO ESTA LOGUEADO
        
      }
      
    });
  }
  @HostListener('window:resize', ['$event'])onResize(event) {
    if(event.target.innerWidth>=750){
      this.router.navigate(['/home']);
    };
  }

  ngOnInit() {
    this.comService.pedirUsuario();
    //console.log("MENU USUARIO OPCIONES PIDIENDO USAURIO");
    if(window.innerWidth >= 750){
      this.router.navigate(['/home']);
    }
    if(!this.usuarioService.logueado()){
      this.abrirModal();
    }
    
  }
  logout(){
    
    this.usuarioService.logout();
    this.comService.enviarUsuario(null);
    location.reload();
    
    
  }
  abrirModal(){
    //console.log("AbrirModal");
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

}

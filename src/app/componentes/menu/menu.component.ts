import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { Router, Route} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [UsuarioService]
})
export class MenuComponent implements OnInit {

  estaLogeado     : boolean = false;
  nombre_tienda   : string  = 'Andean Store';
  usuarioService  : UsuarioService;
  router          : Router;

  constructor(router: Router) {
    this.router = router; 
  }

  ngOnInit() {
  }

  opciones(){
    if (localStorage.getItem("_tk")){
      this.estaLogeado = true;
    }
  }

  logout(){
    localStorage.removeItem("_tk");
    this.router.navigate(['/']);
    this.estaLogeado = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../perfil-usuario/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [UsuarioService]
})
export class MenuComponent implements OnInit {

  estaLogeado: boolean = false;
  nombre_tienda : string = 'Andean Store';
  usuarioService: UsuarioService;

  constructor() { 
  }

  ngOnInit() {
  }

  opciones(){
    if (localStorage.getItem("_tk")){
      this.estaLogeado = true;
    }
  }

}

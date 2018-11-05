import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  estalogeado : boolean;
  nombre_tienda : string = 'Andean Store';

  constructor(
    private usuarioService: UsuarioService
  ) { 
    this.estalogeado = usuarioService.estaLogeado;
  }

  ngOnInit() {
  }

}

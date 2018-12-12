import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { Router} from '@angular/router';
import { UsuarioService } from '../perfil-usuario/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [UsuarioService]
})
export class MenuComponent implements OnInit {
  categoriaService    : CategoriaService;
  estaLogeado         : boolean = false;
  nombre_tienda       : string  = 'Andean Store';
  router              : Router;

  constructor(categoriaService: CategoriaService, router: Router) {
    this.categoriaService     = categoriaService;
    this.router               = router; 
  }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(res => {
      this.categoriaService.categorias = res as Categoria[];
    });
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

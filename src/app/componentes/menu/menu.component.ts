import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { Constantes } from '../constantes';
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
  urlImg              : string = Constantes.URL_IMAGEN;
  urlImagen           : string = "https://via.placeholder.com/400x300";

  constructor(categoriaService: CategoriaService, router: Router) {
    this.categoriaService     = categoriaService;
    this.router               = router; 
  }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(res => {
      this.categoriaService.categorias = res as Categoria[];
      this.categoriaService.categoriaSeleccionada = this.categoriaService.categorias[0];
    });
  }

  categoriaSelected(nombreCategoria: string){
    var i= 0;
    while(this.categoriaService.categorias[i].nombre != nombreCategoria) { i++; }
    this.categoriaService.categoriaSeleccionada = this.categoriaService.categorias[i];
    this.urlImagen = this.urlImg + '/tmp/'+this.categoriaService.categoriaSeleccionada.imagen;
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

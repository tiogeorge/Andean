import { ArticulosbusquedaComponent } from './../articulosbusqueda/articulosbusqueda.component';
import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { Constantes } from '../constantes';
import { Router} from '@angular/router';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import {ServicioapoyoService} from '../articulosbusqueda/servicioapoyo.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [UsuarioService]
})
export class MenuComponent implements OnInit {
  artbus:ArticulosbusquedaComponent;
  pclave2:string;
  categoriaService    : CategoriaService;
  estaLogeado         : boolean = false;
  nombre_tienda       : string  = 'Andean Store';
  router              : Router;
  urlImg              : string = Constantes.URL_IMAGEN;
  urlImagen           : string = "https://via.placeholder.com/400x300";

  constructor(categoriaService: CategoriaService, router: Router, private servicioapoyo:ServicioapoyoService) {
    this.categoriaService     = categoriaService;
    this.router               = router; 
  }

  ngOnInit() {
  //  this.actualizarcomponente();
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
  buscarpa(event){
    //this.actualizarcomponente();
    this.pclave2=(document.getElementById('buscarartpal') as HTMLInputElement).value;//(<HTMLInputElement>document.getElementById("buscarartpal")).value;//(document.getElementsByName('buscarartpal')[0] as HTMLInputElement).value;//
    console.log('entra'+this.pclave2);
    console.log(this.pclave2);
    if(event.key=="Enter"){
      //this.artbus.actualizarcomp();'busqueda/'
      //ArticulosbusquedaComponent.caller.
     // location.reload();
     this.router.navigate(['busqueda/'+this.pclave2]);
     this.actualizarcomponente();
     //html routerLink="/busqueda/{{pclave2}}"
     /* var input=document.getElementById('buscar2input') as HTMLInputElement;
      this.actualizarcomponente();
      document.getElementById('btnbusqueda2').click();*/
    }
  }
  buscarArti(){
    this.pclave2=(<HTMLInputElement>document.getElementById("buscarartpal")).value;
   // alert(this.pclave2);
   this.actualizarcomponente();
    if(this.pclave2!=""){
      //location.reload();
     /* this.actualizarcomponente();
      var input=document.getElementById('buscar2input') as HTMLInputElement;*/
      this.actualizarcomponente();
     // alert('entra');
      this.router.navigate(['busqueda/'+this.pclave2]);
    }
    else{
      this.router.navigate(['busqueda/celulares']);
    }
  }
  public actualizarcomponente(){
    this.servicioapoyo.actualizarpag();
  }
}

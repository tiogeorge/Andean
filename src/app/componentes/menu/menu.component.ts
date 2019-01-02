import { ArticulosbusquedaComponent } from './../articulosbusqueda/articulosbusqueda.component';
import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { Constantes } from '../constantes';
import { Router} from '@angular/router';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { ServicioapoyoService } from '../articulosbusqueda/servicioapoyo.service';
import { SesionService } from '../perfil-usuario/sesion.service';

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

  constructor(categoriaService: CategoriaService, router: Router, private servicioapoyo:ServicioapoyoService, public sesionService : SesionService) {
    this.categoriaService     = categoriaService;
    this.router               = router; 
  }

  ngOnInit() {
  //  this.actualizarcomponente();
    this.categoriaService.getCategorias().subscribe( res => {
      this.categoriaService.categorias = res as Categoria[];
      this.categoriaService.categoriaSeleccionada = this.categoriaService.categorias[0];
    });
    this.getSesion();   
  }

  categoriaSelected(nombreCategoria: string){
    var i= 0;
    while(this.categoriaService.categorias[i].nombre != nombreCategoria) { i++; }
    this.categoriaService.categoriaSeleccionada = this.categoriaService.categorias[i];
    this.urlImagen = this.urlImg + '/tmp/'+this.categoriaService.categoriaSeleccionada.imagen;
  }

  getSesion(){
    this.sesionService.obtenerSesion().subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.status){
        this.estaLogeado = true;
      } else {
        this.estaLogeado = false;
      }
    });
  }

  logout(){
    this.sesionService.cerrarSesion().subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.status){
        this.estaLogeado = false;
        this.router.navigate(['/']);
      }
    })
  }
  
  buscarpa(event:any){
    //this.actualizarcomponente();
    this.pclave2=(document.getElementById('buscarartpal') as HTMLInputElement).value;//(<HTMLInputElement>document.getElementById("buscarartpal")).value;//(document.getElementsByName('buscarartpal')[0] as HTMLInputElement).value;//
    console.log(this.pclave2);
    if(event.key=="Enter"){
    // this.router.navigate(['busqueda/'+this.pclave2]);
    //this.bus(this.pclave2);
     this.router.navigateByUrl('busqueda/'+this.pclave2);
     this.actualizarcomponente(this.pclave2);
     //html routerLink="/busqueda/{{pclave2}}"
     /* var input=document.getElementById('buscar2input') as HTMLInputElement;
      this.actualizarcomponente();
      document.getElementById('btnbusqueda2').click();*/
    }
  }
  bus(p:string){
    this.router.navigateByUrl('busqueda/'+p);
  }
  buscarArti(){
    this.pclave2=(<HTMLInputElement>document.getElementById("buscarartpal")).value;
   // alert(this.pclave2);
  // this.actualizarcomponente();
    if(this.pclave2!=""){
      //location.reload();
     /* this.actualizarcomponente();
      var input=document.getElementById('buscar2input') as HTMLInputElement;*/
   //   this.actualizarcomponente();
      //this.router.navigate(['busqueda/'+this.pclave2]);
      //alert('busqueda/'+this.pclave2);
      this.router.navigateByUrl('busqueda/'+this.pclave2);
    }
    else{
      this.router.navigate(['busqueda/celulares']);
    }
  }
  public actualizarcomponente(dat:string){
    this.servicioapoyo.actualizarpag(dat);
  }
}
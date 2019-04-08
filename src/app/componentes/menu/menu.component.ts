import { ArticulosbusquedaComponent } from './../articulosbusqueda/articulosbusqueda.component';
import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { Constantes } from '../constantes';
import { Router, DefaultUrlSerializer} from '@angular/router';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { ServicioapoyoService } from '../articulosbusqueda/servicioapoyo.service';
import { SesionService } from '../perfil-usuario/sesion.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { comunicacionService } from '../comunicacion.service';
//import {CategoriaService} from '../categoria/categoria.service';
declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [UsuarioService]
})
export class MenuComponent implements OnInit {
  artbus:ArticulosbusquedaComponent;
  pclave2:string;
  estaLogeado         : boolean = false;
  nombre_tienda       : string  = 'Smarket';
  urlImg              : string = Constantes.URL_IMAGEN;
  urlImagen           : string = "https://via.placeholder.com/400x300";
  //auto completado
  myControl = new FormControl();
  options: string[] = ['Celulares', 'Smartphone'];
  filteredOptions: Observable<string[]>;
  listasubcategorias : Categoria[] = new Array();
  //fin auto completado
  subscription: Subscription;
  catsubscription : Subscription;
  nombreusuario = "Identificate";
  nomostrarbusquedap = true;
  categorias = new Array();
  usuarioLogueado :any;

  constructor(public categoriaService: CategoriaService,public router: Router, public servicioapoyo:ServicioapoyoService, public sesionService : SesionService, public comService: comunicacionService) {
    this.subscription = this.comService.inicioSesion()
    .subscribe(user => {
      if(user.nombres){
        this.estaLogeado = true;
        var nombre = user.nombres.split(" ")[0];
        this.nombreusuario = nombre.charAt(0).toUpperCase() + nombre.substr(1).toLowerCase();
        console.log("LLEGO DEL LOGIN :" + user.nombres);
        console.log(this.estaLogeado);
      }
      
    });
    this.catsubscription = this.comService.getCategorias()
    .subscribe(cat =>{
      console.log("LLEGO CATEGORIAS");
      this.categorias = cat as any[];
    });

  }

  ngOnInit() {
  //  this.actualizarcomponente();
    this.categoriaService.getSubCategorias("root").subscribe( res => {
      this.categoriaService.categorias = res as Categoria[];
      this.categoriaService.categoriaSeleccionada = this.categoriaService.categorias[0];
    });
    this.getSesion();   
    //auto comple
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    //fin auto comple

    $(window).on("resize", this.resize);
  }
  resize() {
    document.getElementById("mySidepanel").style.height = window.innerHeight+"px";
    document.getElementById("mySidepanel2").style.height = window.innerHeight+"px";
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  /* Set the width of the sidebar to 250px (show it) */
  openNav() {
    
    document.getElementById("mySidepanel").style.width = "280px";
    document.getElementById("mySidepanel").style.height = window.innerHeight+"px";
    document.getElementById("mySidepanel2").style.width = "100%";
    document.getElementById("mySidepanel2").style.height = window.innerHeight+"px";
    document.getElementById("mySidepanel2").style.overflowY = "auto";
    if(this.categorias.length==0){
      console.log("BUSCANDO CATEFRIAS EN MENU");
      this.categoriaService.listarcategoriaspadres()
      .subscribe(res =>{
        this.categorias = res as any[];
      });
    }
  }
  mostrocategorias= false;
  mostrarCategorias(){
    var campo = document.getElementById("cont-categorias-menu-movil");
    var campobusqueda = document.getElementById("cont-categorias-menu-movil-list");
    if(!this.mostrocategorias){
      this.mostrocategorias = true;
      
      campo.style.height= "auto";
      campobusqueda.style.display="flex";
      document.getElementById("icon-categoria-expandido").innerHTML="expand_less";
    }else{
      this.mostrocategorias = false;
      campo.style.height= "0px";
      campobusqueda.style.display="none";
      document.getElementById("icon-categoria-expandido").innerHTML="expand_more";
    }
  }
  mostrocaompobusqueda = false;
  mostrarCampoBusqueda(){
    var campo = document.getElementById("campo-busqueda-movil");
      var campobusqueda = document.getElementById("input-busqueda-movil");
    if(!this.mostrocaompobusqueda){
      this.mostrocaompobusqueda = true;
      
      campo.style.height= "50px";
      campobusqueda.style.display="flex";
      document.getElementById("buscarartpal2").focus();
    }else{
      this.mostrocaompobusqueda = false;
      campo.style.height= "0px";
      campobusqueda.style.display="none";
    }
  }
  
  abrirChat(){
    this.comService.abrirChat();
    this.closeNav();
  }
  /* Set the width of the sidebar to 0 (hide it) */
  closeNav() {
    document.getElementById("mySidepanel").style.width = "0px";
    document.getElementById("mySidepanel2").style.width = "0px";
  }

  mostrarMenu(opcion){
    if(this.nomostrarbusquedap)
    this.nomostrarbusquedap = false;
    else
    this.nomostrarbusquedap = true;
  }

  //auto comple
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  //fin auto comple
  categoriaSelected(idcategoria: string){
   // var i= 0;
   // while(this.categoriaService.categorias[i].nombre != nombreCategoria) { i++; }
    //this.categoriaService.categoriaSeleccionada = this.categoriaService.categorias[i];
    //this.urlImagen = this.urlImg + '/tmp/'+this.categoriaService.categoriaSeleccionada.imagen;
    /*this.categoriaService.getSubCategorias(idcategoria).subscribe(res=>{
      console.log(res);
    });*/
    console.log(idcategoria);
  }

  getSesion(){
    this.sesionService.obtenerSesion().subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.status){   
        var nombre = jres.user.nombres.split(" ")[0];
        this.nombreusuario = nombre.charAt(0).toUpperCase() + nombre.substr(1).toLowerCase(); 
        this.estaLogeado = true;
        console.log(jres.user);
        this.comService.enviarUsuario(jres.user);
        this.usuarioLogueado = jres.user;
      } else {
        this.estaLogeado = false;
      }
    });
  }

  logout(){
    this.sesionService.cerrarSesion().subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.status){
        
        this.router.navigate(['/']);
        this.comService.enviarCerrarSesion();
        this.nombreusuario="Identificate";
        this.estaLogeado = false;
        
      }
    })
  }
  abrirChatMovil(){
    this.comService.enviarUsuario(this.usuarioLogueado);
    this.closeNav();
  }

  buscarpa(event:any){
    //this.actualizarcomponente();
    this.pclave2=(document.getElementById('buscarartpal') as HTMLInputElement).value;//(<HTMLInputElement>document.getElementById("buscarartpal")).value;//(document.getElementsByName('buscarartpal')[0] as HTMLInputElement).value;//
    console.log(this.pclave2);
    if(event.key=="Enter"){
    // this.router.navigate(['busqueda/'+this.pclave2]);
    //this.bus(this.pclave2);
     this.router.navigateByUrl('busqueda/palclav/'+this.pclave2);
     this.enviarPalabraClave();
     //this.actualizarcomponente(this.pclave2);
     
     //html routerLink="/busqueda/{{pclave2}}"
     /* var input=document.getElementById('buscar2input') as HTMLInputElement;
      this.actualizarcomponente();
      document.getElementById('btnbusqueda2').click();*/
    }
  }
  buscarpa2(event:any){
    //this.actualizarcomponente();
    this.pclave2=(document.getElementById('buscarartpal2') as HTMLInputElement).value;//(<HTMLInputElement>document.getElementById("buscarartpal")).value;//(document.getElementsByName('buscarartpal')[0] as HTMLInputElement).value;//
    console.log(this.pclave2);
    if(event.key=="Enter"){
    // this.router.navigate(['busqueda/'+this.pclave2]);
    //this.bus(this.pclave2);
     this.router.navigateByUrl('busqueda/palclav/'+this.pclave2);
     this.enviarPalabraClave();
     //this.actualizarcomponente(this.pclave2);
     
     //html routerLink="/busqueda/{{pclave2}}"
     /* var input=document.getElementById('buscar2input') as HTMLInputElement;
      this.actualizarcomponente();
      document.getElementById('btnbusqueda2').click();*/
      document.getElementById("buscarartpal2").blur();
    }
  }
  bus(p:string){
    this.router.navigateByUrl('busqueda/palclav/'+p);
  }
  buscarArti(){
    var linea='PREPAGO';
    var tipoplan='ALTA';
    var cuotas='0'; 
    document.getElementById("buscarartpal2").blur();

    this.pclave2=(<HTMLInputElement>document.getElementById("buscarartpal")).value;
     var clave3 = (<HTMLInputElement>document.getElementById("buscarartpal2")).value;
   // alert(this.pclave2);
  // this.actualizarcomponente();
    if(this.pclave2!=""){
      //location.reload();
     /* this.actualizarcomponente();
      var input=document.getElementById('buscar2input') as HTMLInputElement;*/
      
      // this.actualizarcomponente(this.pclave2);
      
      this.router.navigate(['busqueda/palclav/'+this.pclave2]);
      //alert('busqueda/'+this.pclave2);
//      this.router.navigateByUrl('busqueda/'+this.pclave2);
    }
    else{
      if(clave3 != ""){
        this.router.navigate(['busqueda/palclav/'+clave3]);
      }else{
        this.router.navigate(['busqueda/palclav/celulares']);
      }
    }
  }
  busquedacat(id:string){
    var valor="cat/"+id;
    console.log(valor);
    this.router.navigate(['busqueda/palclav/'+valor]);
  }
  public actualizarcomponente(dat:string){
    this.servicioapoyo.actualizarpag(dat);
  }
  public enviarPalabraClave(){
    this.servicioapoyo.enviarPalabraClave(this.pclave2);
  }
  public limpiarMensaje(){
    this.servicioapoyo.limpiarMensaje();
  }
}
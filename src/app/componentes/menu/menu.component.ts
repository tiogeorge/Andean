import { ArticulosbusquedaComponent } from './../articulosbusqueda/articulosbusqueda.component';
import { Component, OnInit, HostListener,Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { Constantes } from '../constantes';
import { Router, DefaultUrlSerializer, Event, NavigationEnd} from '@angular/router';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { ServicioapoyoService } from '../articulosbusqueda/servicioapoyo.service';
import { SesionService } from '../perfil-usuario/sesion.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { comunicacionService } from '../comunicacion.service';
import { MatDialog } from '@angular/material';
import { DialogCategoriasComponent } from '../dialog-categorias/dialog-categorias.component';
//import {CategoriaService} from '../categoria/categoria.service';
declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component2.css'],
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
  Usersubscription: Subscription;
  catsubscription : Subscription;
  valsubscription : Subscription;
  catpetsubscription : Subscription;
  nombreusuario = "Identificate";
  nomostrarbusquedap = true;
  categorias = new Array();
  usuarioLogueado :any = null;
  mostrarCargandoDatosUsuario = false;
  URL_IMAGENES = Constantes.URL_IMAGEN_SM ;
  @Output() public sidenavToggle = new EventEmitter();

  //ToolBars
  @ViewChild('search_input') searchInput: ElementRef;
  @ViewChild('searchtoolbar') set userContent(element) {
    if (element) {
       this.searchInput.nativeElement.focus();
    }
  }
  showNormalToolbar = true;

  

  constructor(public categoriaService: CategoriaService,public router: Router, public servicioapoyo:ServicioapoyoService, public usuarioService : UsuarioService, public comService: comunicacionService,public dialog: MatDialog) {
    
    this.catsubscription = this.comService.getCategorias()
    .subscribe(cat =>{
      this.categorias = cat as any[];
    });  
    this.catpetsubscription = this.comService.atenderPedidoCategorias()
    .subscribe(cat =>{
      this.obtenerCategorias();
    });  
    this.valsubscription = this.comService.atenderPedidoUsuario().subscribe(res=>{
      this.comService.enviarUsuarioValoracion(this.usuarioLogueado);
      this.comService.enviarUsuario(this.usuarioLogueado);
    });

  }
  
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    var offsetscroll = $event.srcElement.children[0].scrollTop;
    if(offsetscroll>=24){
     // console.log("MOSTRAR MENU");
      document.getElementById("menu-principal").style.position = "fixed";
    }else{
      //console.log("OCULTAR MENU");
      document.getElementById("menu-principal").style.position = "relative";
    }
  }  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    var modal = document.getElementById("modalBusqueda");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  ngOnInit() {
  //  this.actualizarcomponente();    
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
  /* NUEVO CODIGO*/
  openDialogCategorias(){
    var datos = {option: "simple"}
    const dialogRef = this.dialog.open(DialogCategoriasComponent, {
      width: '99%',
      height: '80%',
      data: datos ,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
       console.log("cERRO DIALOG CATEGORIAS")
      }else{
        console.log("CANCELO");
      }
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  public openToolBarSearch(){
    this.showNormalToolbar = false; 
    
    
  }
  public focusInputSearch(){
    this.searchInput.nativeElement.focus();
  }
  public closeToolBarSearch(){
    this.showNormalToolbar = true; 
  }

  public iraHome(){
    this.router.navigate(['/']);
  }

/*=========================================================== */

  obteniendocategorias = false;

  obtenerCategorias(){
    //console.log("Encima de categorias");
    if(!this.categoriaService.categorias && !this.obteniendocategorias){
      this.obteniendocategorias = true;      
      //console.log("OBTENIENDO CATEGORIAS");
      this.categoriaService.getSubCategorias("root").subscribe( res => {
        this.categoriaService.categorias = res as Categoria[];
        this.categoriaService.categoriaSeleccionada = this.categoriaService.categorias[0];
        this.obteniendocategorias= false;
        this.comService.enviarCategorias(this.categoriaService.categorias);
      });
    }else{
      this.comService.enviarCategorias(this.categoriaService.categorias);    
    }
    
  }
  enviarIdCategoria(id){
    this.comService.enviarIDCategoria(id);
  }
  resize() {
    
    
  }
  ngOnDestroy() {
    this.Usersubscription.unsubscribe();
  }
  
  /* Set the width of the sidebar to 250px (show it) */
  openNav() {
    
    document.getElementById("mySidepanel").style.width = "280px";
    document.getElementById("mySidepanel").style.height = window.innerHeight+"px";
    document.getElementById("mySidepanel2").style.width = "100%";
    document.getElementById("mySidepanel2").style.height = window.innerHeight+"px";
    document.getElementById("mySidepanel2").style.overflowY = "auto";
    if(this.categorias.length==0){
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
    });*/
  }

  getSesion(){
    this.mostrarCargandoDatosUsuario = true;
    this.nombreusuario = "";
    if(localStorage.getItem('session_token')){
      
      //console.log("SI ESTA LOGUEADO OBTENIENDO INFORMACION DEL USUARIO");
      this.usuarioService.getUsuario().subscribe( res => {
        this.mostrarCargandoDatosUsuario = false;
        var jres = JSON.parse(JSON.stringify(res));
        if (jres.status){   
          
          var nombre = jres.data.nombres.split(" ")[0];
          this.nombreusuario = nombre.charAt(0).toUpperCase() + nombre.substr(1).toLowerCase(); 
          this.estaLogeado = true;
          this.comService.enviarUsuario(jres.data);
          this.usuarioLogueado = jres.data;
          this.comService.enviarUsuario(jres.data);
        } else {
          this.nombreusuario = "Identificate";
          this.estaLogeado = false;
          this.comService.enviarUsuario(null);
        }
      });
    }else{
      this.nombreusuario = "Identificate";

      this.mostrarCargandoDatosUsuario = false;
      //console.log("NO SE INICIO SESION");
      this.estaLogeado = false;
      this.comService.enviarUsuario(null);
    }    
  }

  logout(){
    /*this.sesionService.cerrarSesion().subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.status){
        
        
        this.comService.enviarCerrarSesion();
        this.nombreusuario="Identificate";
        this.estaLogeado = false;
        
      }
    })*/
    this.usuarioService.logout();
    this.estaLogeado = false;
    this.comService.enviarUsuario(null);
    this.nombreusuario = "Identificate";
    this.usuarioLogueado = null;
    location.reload();
    
    
  }
  abrirChatMovil(){
    this.comService.enviarUsuario(this.usuarioLogueado);
    this.closeNav();
  }

  buscarpa(event:any){
    //this.actualizarcomponente();
    this.pclave2=(document.getElementById('buscarartpal') as HTMLInputElement).value;//(<HTMLInputElement>document.getElementById("buscarartpal")).value;//(document.getElementsByName('buscarartpal')[0] as HTMLInputElement).value;//
    if(event.key=="Enter"){
      //this.cerrarModal();
    // this.router.navigate(['busqueda/'+this.pclave2]);
    //this.bus(this.pclave2);
     this.router.navigateByUrl('busqueda/palclav/'+this.pclave2+'/1');
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
    if(event.key=="Enter"){
      //this.cerrarModal();
    // this.router.navigate(['busqueda/'+this.pclave2]);
    //this.bus(this.pclave2);
     this.router.navigateByUrl('busqueda/palclav/'+this.pclave2+'/1');
     this.enviarPalabraClave();
     //this.actualizarcomponente(this.pclave2);
     
     //html routerLink="/busqueda/{{pclave2}}"
     /* var input=document.getElementById('buscar2input') as HTMLInputElement;
      this.actualizarcomponente();
      document.getElementById('btnbusqueda2').click();*/
      var inputbusqueda2 = document.getElementById("buscarartpal2") as HTMLInputElement;
      inputbusqueda2.value = "";
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
    //this.cerrarModal();

    this.pclave2=(<HTMLInputElement>document.getElementById("buscarartpal")).value;
     var clave3 = (<HTMLInputElement>document.getElementById("buscarartpal2")).value;
   // alert(this.pclave2);
  // this.actualizarcomponente();
    if(this.pclave2!=""){
      //location.reload();
     /* this.actualizarcomponente();
      var input=document.getElementById('buscar2input') as HTMLInputElement;*/
      
      // this.actualizarcomponente(this.pclave2);
      
      this.router.navigate(['busqueda/palclav/'+this.pclave2+'/1']);
      //alert('busqueda/'+this.pclave2);
//      this.router.navigateByUrl('busqueda/'+this.pclave2);
    }
    else{
      if(clave3 != ""){
        this.router.navigate(['busqueda/palclav/'+clave3+'/1']);
      }else{
        this.router.navigate(['busqueda/palclav/celulares']);
      }
    }
    var inputbusqueda = document.getElementById("buscarartpal") as HTMLInputElement;
    var inputbusqueda2 = document.getElementById("buscarartpal2") as HTMLInputElement;
    inputbusqueda.value = "";
    inputbusqueda2.value = "";
    
  }
  busquedacat(id:string){
    var valor="cat/"+id;
    this.router.navigate(['busqueda/palclav/'+valor+'/1']);
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
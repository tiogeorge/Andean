import { ActivatedRoute } from "@angular/router";
import { Articulo } from './articulo';
import { ArticuloDetalleService } from "./articulo-detalle.service";
import { CategoriaService } from '../menu/categoria.service';
import { Categoria } from '../menu/categoria';
import { Component, OnInit } from '@angular/core';
import { Constantes } from '../constantes';
import { MatDialog } from '@angular/material';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { DialogoCarritoComponent } from "./dialogo-carrito/dialogo-carrito.component";

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.component.html',
  styleUrls: ['./articulo-detalle.component.css']
})
export class ArticuloDetalleComponent implements OnInit {
  articuloService       : ArticuloDetalleService;
  usuarioService        : UsuarioService;
  categoriaService      : CategoriaService;
  URL_IMAGENES          : string  = Constantes.URL_API_IMAGEN;
  habilitarBotonCarrito : boolean = true;
  categoria             : Categoria;

  //Precios
  tipoLineaSeleccionada : string = "PREPAGO";
  tipoPlanSeleccionado : string = "ALTA";
  tipoCuotaSeleccionada: string = "0";
  listaprecios = new Array();

  //controlar select de opciones de compra
  //controlCuotas: boolean = false;
  controlTipoPlan: boolean = true;
  controlLineas: boolean = false;
  controlCuotas = true;
  nomostrarPrecios = true;
  hayPrecios=false;
  almes=" al mes";
  ocultarZoom = true;

  configuroZoom=false;

  listalineas: any[];
  listatipoplanes: any[];
  listacuotas: any[];
  listacuotasSeleccionadas: any[] = new Array();

  planSeleccionado = {
    nombreplan:"",
    precio:0,
    montomes:0,
    cuotainicial:0,
    cuotas:0,
    cuotamensual:0
  };
  //Lista de precios segun el filtro seleccionado
  listPreciosFiltro: any[] = new Array();
  constructor(private route: ActivatedRoute, articuloService: ArticuloDetalleService, usuarioService: UsuarioService, public dialog: MatDialog, categoriaService: CategoriaService) { 
    this.articuloService  = articuloService;
    this.categoriaService = categoriaService;
    this.usuarioService   = usuarioService;
  }

  ngOnInit() {

    this.listalineas = [{valor:"PREPAGO", nombre: "Prepago"}, {valor:"POSTPAGO", nombre: "Postpago"}];
    this.listatipoplanes=[
      {valor: "ALTA",nombre:"Linea Nueva"},
      {valor: "PORTABILIDAD",nombre:"Portabilidad"},
      {valor: "RENOVACION",nombre:"Renovación"},
      {valor: "PORTABILIDAD EXCLUSIVA",nombre:"Portabilidad Especial"},
      {valor: "RENOVACION EXCLUSIVA",nombre:"Renovación Especial"}      
    ];
    this.listacuotas=[
      {valor:"0", nombre:"Sin Cuotas"},
      {valor:"12", nombre:"12 Cuotas"},
      {valor:"18", nombre:"18 Cuotas"}
    ]
    this.controlCuotas = true;
    this.controlTipoPlan = true;
    this.controlLineas = false;
    
  }
  
  ngAfterViewInit() {
    var url = this.route.snapshot.paramMap.get("id");
    this.articuloService.getArticulo(url).subscribe( res => {
      this.articuloService.articuloSeleccionado = res[0] as Articulo;
      this.cambiar_imagen(this.articuloService.articuloSeleccionado.imagenes[0]);
      document.getElementById("descripcion-articulo").innerHTML = this.articuloService.articuloSeleccionado.descripcion;
      this.buscarPreciosFiltro();
    //  this.obtenerPreciosArticulo();
    });   
    this.categoriaService.getCategoria(this.articuloService.articuloSeleccionado.categoria).subscribe( res => {
      this.articuloService.categoria = res[0] as Categoria;
    });
  }

  agregarCarrito(){
    this.usuarioService.agregarArticuloCarrito(this.articuloService.articuloSeleccionado.url, this.planSeleccionado).subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      this.openDialog(jres);
    }); 
  }

  seleccionarPlan(plan){
    this.planSeleccionado = plan;
    console.log(this.planSeleccionado)
  }

  buscarPreciosFiltro(){    
    var contenedor = document.getElementById("contenido-planes-equipo");
    contenedor.style.transform="translateX(-0px)";
    console.log(contenedor.clientWidth);
    this.listacuotasSeleccionadas = new Array();
    if(this.tipoPlanSeleccionado=="ALTA"){
      for(var i = 0;i<this.listacuotas.length;i++){
        if(this.listacuotas[i].valor == "0"){
          this.listacuotasSeleccionadas.push(this.listacuotas[i]);
          this.tipoCuotaSeleccionada = "0";
        }
      }
    }else{
        this.listacuotasSeleccionadas = this.listacuotas;
        
    }
    this.slide=0;
    this.planSeleccionado = {
      nombreplan:"",
      precio:0,
      montomes:0,
      cuotainicial:0,
      cuotas:0,
      cuotamensual:0
    };
    this.nomostrarPrecios = true;
    this.hayPrecios = false;
    if(this.tipoLineaSeleccionada == "PREPAGO"){
      this.tipoPlanSeleccionado = "ALTA";
      this.tipoCuotaSeleccionada = "0";
      this.controlTipoPlan = true;
      this.controlCuotas = true;
      this.almes="";
    }else{
      this.controlTipoPlan = false;
      this.controlCuotas = false;
      this.almes=" al mes";
    }
    console.log(this.tipoLineaSeleccionada+" - "+this.tipoPlanSeleccionado+" - "+this.tipoCuotaSeleccionada);
    this.articuloService.getPreciosArticulo(this.articuloService.articuloSeleccionado.idprecio,this.tipoLineaSeleccionada, this.tipoPlanSeleccionado, this.tipoCuotaSeleccionada)
    .subscribe(res=>{
      
      this.listPreciosFiltro = res as any[];
      if(this.listPreciosFiltro.length==0){
        this.hayPrecios = true;
      }else{
        this.hayPrecios = false;
        this.nomostrarPrecios = false;
        if(this.tipoLineaSeleccionada=="PREPAGO"){
          this.listPreciosFiltro[0].nombreplan="Prepago";
        }
        this.planSeleccionado = this.listPreciosFiltro[0];
      }
      
      //console.log(res);
    });    
  }
  slide=0;
  moverScroll(){    
    var contenedor = document.getElementById("contenido-planes-equipo");
    if(this.slide<this.listPreciosFiltro.length-1){
      this.slide++;
    } 
    contenedor.style.transform="translateX(-"+186*this.slide+"px)";
    
    
  }
  moverScrollRigth(){    
    var contenedor = document.getElementById("contenido-planes-equipo");
    if(this.slide>0){
      this.slide--;
    }      
    contenedor.style.transform="translateX(-"+186*this.slide+"px)";    
  }

  mouse_over(){
    if(screen.width>1024){

      this.ocultarZoom = false;     
        
      
    }else{
      console.log("no se permite el zoom de la imagen");
    }  
  }

  mouse_out(){
    if(screen.width>1024){
      this.ocultarZoom = true;
      this.configuroZoom = false;
     // console.log("salio de la imagen");
    }else{
      console.log("no se permite el zoom de la imagen");
    }
  }

  mouse_move(evento){
    if(screen.width>1024){
      var lens = document.getElementById("lente");
      var img,x,y;    
      img = document.getElementById("imagen-origen");
      var result = document.getElementById("resultado-zoom");
      evento.preventDefault();   
      var pos = this.getCursorPos(evento);
      /* Calculate the position of the lens: */
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /* Prevent the lens from being positioned outside the image: */
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      /* Set the position of the lens: */
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      console.log(x+" - "+y);

    }else{
      console.log("no se permite el zoom de la imagen");
    }
  }
  getCursorPos(e) {
    var img = document.getElementById("imagen-origen");
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
  cambiar_imagen(url){
    let imageseleccionada = document.getElementById("imagen-seleccionada") as HTMLImageElement;
    imageseleccionada.src  = this.articuloService.url_imagenes+"/tmp/"+url;
  }

  abrirImagen(){
    if(screen.width<=1024){
      let imageseleccionada = document.getElementById("imagen-seleccionada") as HTMLImageElement;
      var imagenzoom = document.getElementById("imagezoommobile") as HTMLImageElement;
      imagenzoom.src = imageseleccionada.src;      
      document.getElementById("btnzoommobile").click();
    }
  }

  openDialog(res: any) : void {
    const dialogRef = this.dialog.open(DialogoCarritoComponent, {
      width: '600px',
      data: {
        status: res.status, 
        mensaje: res.msg ? res.msg : res.error,
        urlImagen: this.articuloService.url_imagenes,
        articulo: this.articuloService.articuloSeleccionado,
        plan: this.planSeleccionado
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (res.status) {
        this.habilitarBotonCarrito = false;
      }
    });
  }

}
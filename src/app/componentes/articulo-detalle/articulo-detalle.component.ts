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

  listalineas: any[];
  listatipoplanes: any[];
  listacuotas: any[];

  planSeleccionado = null;

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
    this.usuarioService.agregarArticuloCarrito(this.articuloService.articuloSeleccionado.url).subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      this.openDialog(jres);
    }); 
  }

  seleccionarPlan(plan){
    this.planSeleccionado = plan;
    console.log(this.planSeleccionado)
  }

  buscarPreciosFiltro(){
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
      }
      
      //console.log(res);
    });    
  }

  moverScroll(){
    var contenedor = document.getElementById("contenido-planes-equipo");
    contenedor.scrollLeft -= 180;
  }
  moverScrollRigth(){
    var contenedor = document.getElementById("contenido-planes-equipo");
    contenedor.scrollLeft += 180;
  }

  mouse_over(){
    if(screen.width>1024){
      let cont = document.getElementById("cont-imagen-zoom") as HTMLDivElement;
      let imagen = document.getElementById("imagen-zoom") as HTMLDivElement;
      let imageseleccionada = document.getElementById("imagen-seleccionada") as HTMLImageElement;
      let contenedor = document.getElementById("imagen-grande-select") as HTMLDivElement;
      cont.style.width = (imageseleccionada.clientWidth+10)+"px";
      cont.style.height = (imageseleccionada.clientHeight+10)+"px";
      imagen.style.backgroundImage = "url('"+imageseleccionada.src+"')";
      imagen.style.zIndex="-100";
      imagen.style.transform="scale(2.5)";
      cont.style.display="block";
    }else{
      console.log("no se permite el zoom de la imagen");
    }  
  }

  mouse_out(){
    if(screen.width>1024){
      let cont = document.getElementById("cont-imagen-zoom") as HTMLDivElement;
      let imagen = document.getElementById("imagen-zoom") as HTMLImageElement;
      let imageseleccionada = document.getElementById("imagen-seleccionada") as HTMLImageElement;
      let contenedor = document.getElementById("imagen-grande-select") as HTMLDivElement;
      cont.style.width = (imageseleccionada.clientWidth+10)+"px";
      cont.style.height = (imageseleccionada.clientHeight+10)+"px";
      imagen.style.backgroundImage = imageseleccionada.src;
      imagen.style.transform="scale(1)";
      cont.style.width = contenedor.clientWidth+"px";
      cont.style.display="none";
      //console.log("salio de la la imagen");
      //  console.log("se permite zoom");
      //  console.log("pantalla "+screen.height+"  ancho: "+screen.width);
    }else{
      console.log("no se permite el zoom de la imagen");
    }
  }

  mouse_move(){
    if(screen.width>1024){
      let cont = document.getElementById("cont-imagen-zoom") as HTMLDivElement;
      let imagen = document.getElementById("imagen-zoom") as HTMLDivElement;
      let imageseleccionada = document.getElementById("imagen-seleccionada") as HTMLImageElement;
      let contenedor = document.getElementById("imagen-grande-select") as HTMLDivElement;
      let contenedor_img = document.getElementById("cont-images") as HTMLDivElement;
      var x = (event as MouseEvent).pageX;
      var y = (event as MouseEvent).pageY;
      var ancho = imageseleccionada.clientWidth;
      var altopor = ((y - imageseleccionada.offsetTop) / imageseleccionada.clientHeight) * 100 +'%';
      imagen.style.transformOrigin= (((x - imageseleccionada.offsetLeft) / imageseleccionada.clientWidth* 100) )+ "% " +((((y - (contenedor_img.offsetTop+120)) / imageseleccionada.clientHeight) * 100) ) +'%';
    }else{
      console.log("no se permite el zoom de la imagen");
    }
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
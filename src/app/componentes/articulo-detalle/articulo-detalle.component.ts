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
import { Calificacion } from './calificacion';
import { MarcaService } from '../marca/marca.service';
import { Marca } from '../marca/marca';
import { ValoracionService } from "../valoracion/valoracion.service";
import { Valoracion } from '../valoracion/valoracion';
import { Usuario } from './../perfil-usuario/usuario';
import { NgForm } from '@angular/forms';
import { Equipo } from './equipo';
import { Title, Meta } from '@angular/platform-browser';
import { Respuesta } from '../perfil-usuario/respuesta';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.component.html',
  styleUrls: ['./articulo-detalle.component.css']
})
export class ArticuloDetalleComponent implements OnInit {
  URL_IMAGENES: string = Constantes.URL_API_IMAGEN;
  habilitarBotonCarrito: boolean = true;
  categoria: Categoria;
  marca: Marca = new Marca();

  //Precios
  tipoLineaSeleccionada: string = "PREPAGO";
  tipoPlanSeleccionado: string = "ALTA";
  tipoCuotaSeleccionada: string = "0";
  listaprecios = new Array();

  //controlar select de opciones de compra
  //controlCuotas: boolean = false;
  controlTipoPlan: boolean = true;
  controlLineas: boolean = false;
  controlCuotas = true;
  nomostrarPrecios = true;
  hayPrecios = false;
  almes = " al mes";
  ocultarZoom = true;

  configuroZoom = false;

  listalineas: any[];
  listatipoplanes: any[];
  listacuotas: any[];
  listacuotasSeleccionadas: any[] = new Array();
  listaDetallePlan: any[] = new Array();
  cx = 0;
  cy = 0;
  cargoMarca = false;
  cantidadSeleccionada = 0;
  nomostrarPlanesPostpago= true;
  colorSeleccionado="";
  equipoSeleccionado: Equipo = new Equipo();

  carritoLocal: any[] = new Array();;
  mostrarPrecioArticulo = false;

  planSeleccionado = {
    nombreplan: "",
    precio: 0,
    montomes: 0,
    cuotainicial: 0,
    cuotas: 0,
    cuotamensual: 0
  };
  //Lista de precios segun el filtro seleccionado
  listPreciosFiltro: any[] = new Array();
  constructor(public route: ActivatedRoute, 
      public articuloService: ArticuloDetalleService, 
      public usuarioService: UsuarioService, 
      public dialog: MatDialog, 
      public categoriaService: CategoriaService, 
      public marcaService: MarcaService, 
      public valoracionService: ValoracionService, 
      public titleService: Title,
      public metaService: Meta) {
  }

  //Actualizacion de numero de comentarios y promedio de puntaje

  message:string;

  receiveMessage($event) {
    this.infoComentarios();
    this.message = $event;
  }

  //Valoraciones
  numeroComentarios: Number  = 0;
  textoNumeroComentarios: String = 'Sin Comentarios';
  puntuacionPromedio: Number  = 0;
  ngOnInit() {
    this.articuloService.articuloSeleccionado  = new Articulo();
    this.listalineas = [{ valor: "PREPAGO", nombre: "Prepago" }, { valor: "POSTPAGO", nombre: "Postpago" }];
    this.listatipoplanes = [
      { valor: "ALTA", nombre: "Linea Nueva" },
      { valor: "PORTABILIDAD", nombre: "Portabilidad" },
      { valor: "RENOVACION", nombre: "Renovación" },
      { valor: "PORTABILIDAD EXCLUSIVA", nombre: "Portabilidad Especial" },
      { valor: "RENOVACION EXCLUSIVA", nombre: "Renovación Especial" }
    ];
    this.listacuotas = [
      { valor: "0", nombre: "Sin Cuotas" },
      { valor: "12", nombre: "12 Cuotas" },
      { valor: "18", nombre: "18 Cuotas" }
    ]
    this.controlCuotas = true;
    this.controlTipoPlan = true;
    this.controlLineas = false;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    

  }

  ngAfterViewInit() {
    var url = this.route.snapshot.paramMap.get("id");
    this.mostrarPrecioArticulo = false;
    this.articuloService.getArticulo(url).subscribe(res => {
      this.mostrarPrecioArticulo = true;
      this.articuloService.articuloSeleccionado = res[0] as Articulo;
      this.titleService.setTitle('Comprar ' + this.articuloService.articuloSeleccionado.titulo + ' | Smarket');
      this.metaService.updateTag({name: 'description', content: 'Compra el ' + this.articuloService.articuloSeleccionado.titulo + ' aquí en la tienda virtual SMARKET a un precio increible.'})
      this.cambiar_imagen(this.articuloService.articuloSeleccionado.imagenes[0]);
      document.getElementById("descripcion-articulo").innerHTML = this.articuloService.articuloSeleccionado.descripcion;
      document.getElementById("caracteristicas-articulo").innerHTML = this.articuloService.articuloSeleccionado.caracteristicas;
     //console.log("GARANTIAS");
      //console.log(this.articuloService.articuloSeleccionado.garantias);

      this.infoComentarios();      
      //this.buscarPreciosFiltro();
      //this.equipoSeleccionado = ;
      this.seleccionarEquipo(this.articuloService.articuloSeleccionado.equipos[0]);
      if(this.equipoSeleccionado.cantidad>0){
        this.cantidadSeleccionada = 1;
      }else{
        this.cantidadSeleccionada = 0;
      }
      //  this.obtenerPreciosArticulo();     
    });
    this.categoriaService.getCategoria(this.articuloService.articuloSeleccionado.categoria).subscribe(res => {
      this.articuloService.categoria = res[0] as Categoria;
    })

  }

  seleccionarEquipo(equipo){
    //console.log(equipo);
    this.equipoSeleccionado = equipo;
    this.colorSeleccionado = this.equipoSeleccionado.color;
    this.cambiar_imagen(this.equipoSeleccionado.imagen);
    if(this.equipoSeleccionado.cantidad>0){
      this.cantidadSeleccionada = 1;
    }else{
      this.cantidadSeleccionada = 0;
    }
  }

  disminuirCantidad(){
    if(this.cantidadSeleccionada>1)
    this.cantidadSeleccionada--;
  }
  aumentarCantidad(){
    if(this.cantidadSeleccionada<this.equipoSeleccionado.cantidad)
    this.cantidadSeleccionada++;
  }
  infoComentarios() {
    this.valoracionService.obtenerValoracionesArticulo(this.articuloService.articuloSeleccionado.idarticulo).subscribe(res => {
      var a = res as Valoracion[];
      //console.log("VALORACIONES");
      //console.log(a);

      
      this.puntuacionPromedio = 0;
      this.numeroComentarios = 0;
      this.numeroComentarios = a.length;
      if(this.numeroComentarios == 1)
      {
        this.textoNumeroComentarios = "1 Comentario";
      }
      else if (this.numeroComentarios > 1)
      {
        this.textoNumeroComentarios = a.length + " Comentarios";
      }

      if (a !== undefined) {
        if (a.length > 0) {
          var sum = 0;
          for (var i = 0; i < a.length; i++) {
            sum += Number(a[i].puntuacion);
          }
          var prom = Math.round(sum / a.length);
          this.puntuacionPromedio = prom;
        }
      }
    });
  }

  irADetalle(){
    var div = document.getElementById("detalle-producto") ;
    div.scrollIntoView({behavior:"smooth"});
  }

  
  agregarCarrito() {
    if(this.usuarioService.logueado()){
      console.log(this.equipoSeleccionado);
      console.log(this.cantidadSeleccionada);
        this.usuarioService.agregarArticuloCarrito(this.articuloService.articuloSeleccionado.idarticulo, this.equipoSeleccionado.idequipo, this.cantidadSeleccionada, this.equipoSeleccionado.imagen).subscribe( res => {
        const rspta = res as Respuesta;
        this.openDialog(rspta);
      });
    }else{
      //AGREGAR EL CARRITO EN LOCAL STORAGE
      if(localStorage.getItem("cart")){
        this.carritoLocal = JSON.parse(localStorage.getItem("cart"));
      }
      const articulo = {
        id: this.articuloService.articuloSeleccionado.idarticulo,
        idarticulo:  this.equipoSeleccionado.idequipo,
        titulo: this.articuloService.articuloSeleccionado.titulo,
        url: this.articuloService.articuloSeleccionado.url,
        cantidad: this.cantidadSeleccionada,     
        imagen: this.equipoSeleccionado.imagen,
        precio: this.equipoSeleccionado.precioventa,
        descuento: this.articuloService.articuloSeleccionado.descuento
        
      };
      this.carritoLocal.push(articulo);
      localStorage.setItem("cart", JSON.stringify(this.carritoLocal));
      //this.openDialog(rspta);
      

    }
    
  }

  seleccionarPlan(plan) {
    this.planSeleccionado = plan;
    this.listaDetallePlan = new Array();
  }

  /*buscarPreciosFiltro() {
    var contenedor = document.getElementById("contenido-planes-equipo");
    contenedor.style.transform = "translateX(-0px)";
    this.listacuotasSeleccionadas = new Array();
    if (this.tipoPlanSeleccionado == "ALTA") {
      for (var i = 0; i < this.listacuotas.length; i++) {
        if (this.listacuotas[i].valor == "0") {
          this.listacuotasSeleccionadas.push(this.listacuotas[i]);
          this.tipoCuotaSeleccionada = "0";
        }
      }
    } else {
      this.listacuotasSeleccionadas = this.listacuotas;

    }
    this.slide = 0;
    this.planSeleccionado = {
      nombreplan: "",
      precio: 0,
      montomes: 0,
      cuotainicial: 0,
      cuotas: 0,
      cuotamensual: 0
    };
    this.nomostrarPrecios = true;
    this.hayPrecios = false;
    if (this.tipoLineaSeleccionada == "PREPAGO") {
      this.tipoPlanSeleccionado = "ALTA";
      this.tipoCuotaSeleccionada = "0";
      this.controlTipoPlan = true;
      this.controlCuotas = true;
      this.almes = "";
    } else {
      this.controlTipoPlan = false;
      this.controlCuotas = false;
      this.almes = " al mes";
    }
    this.articuloService.getPreciosArticulo(this.articuloService.articuloSeleccionado.idprecio, this.tipoLineaSeleccionada, this.tipoPlanSeleccionado, this.tipoCuotaSeleccionada)
      .subscribe(res => {

        this.listPreciosFiltro = res as any[];
        if (this.listPreciosFiltro.length == 0) {
          this.hayPrecios = true;
        } else {
          this.hayPrecios = false;
          this.nomostrarPrecios = false;
          if (this.tipoLineaSeleccionada == "PREPAGO") {
            this.listPreciosFiltro[0].nombreplan = "Prepago";
          }
          this.planSeleccionado = this.listPreciosFiltro[0];
        }
      });
  }*/
  slide = 0;
  moverScroll() {
    var contenedor = document.getElementById("contenido-planes-equipo");
    if (this.slide < this.listPreciosFiltro.length - 1) {
      this.slide++;
    }
    contenedor.style.transform = "translateX(-" + 186 * this.slide + "px)";


  }
  moverScrollRigth() {
    var contenedor = document.getElementById("contenido-planes-equipo");
    if (this.slide > 0) {
      this.slide--;
    }
    contenedor.style.transform = "translateX(-" + 186 * this.slide + "px)";
  }

  mouse_over() {
    if (screen.width > 1024) {
      var result = document.getElementById("resultado-zoom");

      this.ocultarZoom = false;
      var imagen = document.getElementById("imagen-seleccionada") as HTMLImageElement;
      result.style.backgroundImage = "url('" + imagen.src + "')";
      result.style.backgroundSize = (imagen.width * 2.5) + "px " + (imagen.height * 2.5) + "px";


    } 
  }

  mouse_out() {
    if (screen.width > 1024) {
      this.ocultarZoom = true;
    } 
  }

  mouse_move(evento) {
    if (screen.width > 1024) {
      var lens = document.getElementById("lente");
      var x, y;
      var img = document.getElementById("imagen-origen") as HTMLDivElement;
      var imagen = document.getElementById("imagen-seleccionada");
      var result = document.getElementById("resultado-zoom");
      evento.preventDefault();
      var pos = this.getCursorPos(evento);
      /* Calculate the position of the lens: */
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /* Prevent the lens from being positioned outside the image: */
      if (x > img.clientWidth - lens.offsetWidth) { x = img.clientWidth - lens.offsetWidth; }
      if (x < 0) { x = 0; }
      if (y > img.clientHeight - lens.offsetHeight) { y = img.clientHeight - lens.offsetHeight; }
      if (y < 0) { y = 0; }
      var cx = (result.offsetWidth / lens.offsetWidth) / 4;
      var cy = (result.offsetHeight / lens.offsetHeight) / 4;

      /* Set the position of the lens: */
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /* Display what the lens "sees": */
      result.style.backgroundPosition = (-1 * x + 100) * cx + "px " + (-1 * y + 100) * cy + "px";
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
    return { x: x, y: y };
  }
  cambiar_imagen(url) {
    let imageseleccionada = document.getElementById("imagen-seleccionada") as HTMLImageElement;
    imageseleccionada.src = this.articuloService.url_imagenes + "/lg/" + url;
    var result = document.getElementById("resultado-zoom");
    var img = document.getElementById("imagen-origen") as HTMLDivElement;
    var imagen = document.getElementById("imagen-seleccionada") as HTMLImageElement;
    var lens = document.getElementById("lente");
    var cx = result.offsetWidth / lens.offsetWidth;
    var cy = result.offsetHeight / lens.offsetHeight;
    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + imagen.src + "')";
    result.style.backgroundSize = (imagen.width * 2.5) + "px " + (imagen.height * 2.5) + "px";
  }

  abrirImagen() {
    if (screen.width <= 1024) {
      let imageseleccionada = document.getElementById("imagen-seleccionada") as HTMLImageElement;
      var imagenzoom = document.getElementById("imagezoommobile") as HTMLImageElement;
      imagenzoom.src = imageseleccionada.src;
      document.getElementById("btnzoommobile").click();
    }
  }
  buscarDetallesArticulo(e) {
    if (e.tab.textLabel == "Sobre la Marca") {
      if (!this.cargoMarca) {
        this.marcaService.obtenerMarca(this.articuloService.articuloSeleccionado.marca)
          .subscribe(res => {
            this.marca = res as Marca;
            this.cargoMarca = true;
          });
      }

    }
    if(e.tab.textLabel == "Garantía"){
      document.getElementById("garantias-articulo").innerHTML = this.articuloService.articuloSeleccionado.garantias;
    }
  }
  
  abrirDetallesPlan() {
    this.articuloService.getDetallePlan(this.planSeleccionado.nombreplan)
      .subscribe(res => {
        this.listaDetallePlan = res[0].detalle.split('\n');
      });
  }

  openDialog(res: any): void {
    const dialogRef = this.dialog.open(DialogoCarritoComponent, {
      width: '480px',
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
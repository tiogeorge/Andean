import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { ArticuloDetalleService} from "./articulo-detalle.service";
import { Articulo } from './articulo';
import { Constantes} from '../constantes';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.component.html',
  styleUrls: ['./articulo-detalle.component.css']
})
export class ArticuloDetalleComponent implements OnInit {

  articuloService: ArticuloDetalleService;
  URL_IMAGENES = Constantes.URL_API_IMAGEN;
  

  constructor(private route: ActivatedRoute
            , articuloService: ArticuloDetalleService) { 
    this.articuloService = articuloService;

  }

  ngOnInit() {
    var url = this.route.snapshot.paramMap.get("id");
    console.log("url imagenes "+this.URL_IMAGENES);
    this.articuloService.getArticulo(url).subscribe(res=>{
      this.articuloService.articuloSeleccionado = res[0] as Articulo;
      console.log(res);
      this.cambiar_imagen(this.articuloService.articuloSeleccionado.imagenes[0]);
      document.getElementById("descripcion-articulo").innerHTML = this.articuloService.articuloSeleccionado.descripcion;
    });
    
  }
  seleccionarPlan(idplan){

    var planes = document.getElementsByClassName("item-planes");
    for(var i=0;i<planes.length;i++){
      var plan =planes[i] as HTMLDivElement;
      plan.style.border = "1px solid  orange "
      plan.style.backgroundColor = "white";
      plan.style.color="black"; 
    }
    var plan = document.getElementById(idplan) as HTMLDivElement;
    plan.style.border = "1px solid  white "
    plan.style.backgroundColor = "orange";
    plan.style.color="white"; 
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
    console.log("entro a la imagen");
      console.log("se permite zoom");
    }else{
      console.log("no se permite el zoom de la iamgen");
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
    console.log("salio de la la imagen");
      console.log("se permite zoom");
      console.log("pantalla "+screen.height+"  ancho: "+screen.width);
    }else{
      console.log("no se permite el zoom de la iamgen");
    }

    
  }
  mouse_move(){
    if(screen.width>1024){
      console.log("se permite zoom");
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
     // console.log(contenedor_img.offsetTop +"   -  "+y);
    }else{
      console.log("no se permite el zoom de la iamgen");
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

}

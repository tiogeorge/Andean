import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.component.html',
  styleUrls: ['./articulo-detalle.component.css']
})
export class ArticuloDetalleComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  mouse_over(){

    if(true){
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
    if(true){
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
    }else{
      console.log("no se permite el zoom de la iamgen");
    }

    
  }
  mouse_move(){
    if(true){
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
    imageseleccionada.src  = url;
  }

}

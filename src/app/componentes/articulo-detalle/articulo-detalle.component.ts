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

    let cont = document.getElementById("cont-imagen-zoom") as HTMLDivElement;
    let imagen = document.getElementById("imagen-zoom") as HTMLDivElement;
    let imageseleccionada = document.getElementById("imagen-seleccionada") as HTMLImageElement;
    let contenedor = document.getElementById("imagen-grande-select") as HTMLDivElement;
    cont.style.width = (imageseleccionada.clientWidth+10)+"px";
    cont.style.height = (imageseleccionada.clientHeight+10)+"px";
    imagen.style.backgroundImage = "url('"+imageseleccionada.src+"')";
    imagen.style.zIndex="-100";
    imagen.style.transform="scale(3)";
    cont.style.display="block";

  }
  mouse_out(){
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
  }
  mouse_move(){
    let cont = document.getElementById("cont-imagen-zoom") as HTMLDivElement;
    let imagen = document.getElementById("imagen-zoom") as HTMLDivElement;
    let imageseleccionada = document.getElementById("imagen-seleccionada") as HTMLImageElement;
    let contenedor = document.getElementById("imagen-grande-select") as HTMLDivElement;
  
    var x = (event as MouseEvent).pageX;
    var y = (event as MouseEvent).pageY;
    var ancho = imageseleccionada.clientWidth;
    var altopor = ((y - imageseleccionada.offsetTop) / imageseleccionada.clientHeight) * 100 +'%';

    imagen.style.transformOrigin= (((x - imageseleccionada.offsetLeft) / imageseleccionada.clientWidth* 100) )+ "% " +((((y - imageseleccionada.offsetTop) / imageseleccionada.clientHeight) * 100) - 100) +'%';
    console.log(altopor);
    
  }

}

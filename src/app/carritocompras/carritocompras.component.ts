import { Component, OnInit } from "@angular/core";
import { post } from "selenium-webdriver/http";

@Component({
  selector: "app-carritocompras",
  templateUrl: "./carritocompras.component.html",
  styleUrls: ["./carritocompras.component.css"]
})
export class CarritocomprasComponent implements OnInit {
  listaarticuloscart: string[] = ["Sony Xperia XZ2 Premium", "Galaxy S9", "iPhone 8 de 64 GB "];
  constructor() {}

  ngOnInit() {}
  mostrardivenvio() {
    if (document.getElementById("listaenvio").style.display == "block") {
      document.getElementById("listaenvio").style.display = "none";
    } else {
      document.getElementById("listaenvio").style.display = "block";
    }
  }
  mostrardivcupon() {
    if (document.getElementById("seltcupon").style.display == "block") {
      document.getElementById("seltcupon").style.display = "none";
    } else {
      document.getElementById("seltcupon").style.display = "block";
    }
  }
  eliminaritem(dato) {
    var pos=this.listaarticuloscart.indexOf(dato);
    this.listaarticuloscart.splice(pos,1);
    console.log(pos);
    console.log(this.listaarticuloscart);
    this.mencart();
  }
  eliminartodo(){
    this.listaarticuloscart=null;
    this.mencart();
  }
  mencart(){
    if(this.listaarticuloscart==null){
      document.getElementById('mencartvacio').style.display=('block');
      document.getElementById('listacartarticulos').style.display=('none');
    }
  }
}
